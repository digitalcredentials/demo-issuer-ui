'use server';

import { z } from 'zod';
import { getVCFor } from './vc-templates/getVC';
import nodemailer from 'nodemailer'

const host = process.env.SMTP_HOST
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS
const port = process.env.SMTP_PORT
const exchangeHost = process.env.EXCHANGE_HOST

const smtpOptions : any = {
    host,
    auth: { user, pass },
    ...(port && {port})
} 

const transporter = nodemailer.createTransport(smtpOptions)

const FormSchema = z.object({
  recipientName: z.string().trim()
    .min(1, { message: "You must enter a name." }),
  credentialType: z.string({
    invalid_type_error: 'Please select a credential type.',
  }),
  expiry: z.string({
    invalid_type_error: 'Please select an expiration period.',
  }),
  revocable: z.coerce.boolean(),
  delivery: z.enum(['lcw', 'direct'], {
    invalid_type_error: "Please choose how you'd like to receive the credential.",
  }),
  email: z.string().email()
});

const timeToLive = 604800000 // one week
const tenantName = 'test'

export type State = {
  errors?: {
    recipientName?: string[];
    credentialType?: string[];
    revocable?: string[];
    email?: string[];
    expiry?: string[];
    delivery?: string[];
  };
  message?: string | null,
  signedVC?: any,
  deepLink?: any
};

async function issueToLCW(vc:object, email:string):Promise<any> {
  const dataToPost = {
    tenantName,
    "data": [
      {
        "retrievalId": "single",
        timeToLive,
        vc
      }
    ]
  }

  //https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=50991c0d-e033-49c4-86aa-7f3620cf6937&vc_request_url=https://issuer.dcconsortium.org/exchange/e63007bc-6065-417c-8ae8-6b8fbc6a79df/50991c0d-e033-49c4-86aa-7f3620cf6937
    const result = await postData(`${exchangeHost}/exchange/setup`, dataToPost)
    const deepLink = result[0];
    const splitOnSlash = deepLink.directDeepLink.split('/')
    const transactionId = splitOnSlash.pop()
    const exchangeId = splitOnSlash.pop()
    deepLink.collectionPageURL = `${exchangeHost}/tryit/collect?exchangeId=${exchangeId}&transactionId=${transactionId}`
    sendMail(`<body><h2>Your credential: </h2> <a clicktracking="off" href="${deepLink.collectionPageURL}">Click here to add to Learner Credential Wallet.</a></body>`, email)
    return {deepLink}
      // the links could be emailed out. but show them here first.
}

async function issueDirectly(vc:object):Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch("https://test-issuer.dcconsortium.org/instance/test/credentials/issue", {
    method: "POST",
    body: JSON.stringify(vc),
    headers: myHeaders,
  });
  const json = await response.json();
  return {signedVC: json}
}


export async function issueCredential(prevState: State, formData: FormData) {

  const validatedFields = FormSchema.safeParse({
    recipientName: formData.get('recipientName'),
    credentialType: formData.get('credentialType'),
    revocable: formData.get('revocable'),
    expiry: formData.get('expiry'),
    delivery: formData.get('delivery'),
    email: formData.get('email')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields - complete them so we can get you your credential!",
    };
  }

  const { delivery, revocable } = validatedFields.data;
  const vc = getVCFor(validatedFields.data)


  // Call the signing service
  try {
    if (delivery === 'lcw') {
      return issueToLCW(vc, validatedFields.data.email)
    } else {
      return issueDirectly(vc)
    }

  } catch (error) {
    console.log(error)
    return {
      message: 'Error: Failed to issue.',
    };
  }
}

async function postData(url = "", data = {}) {

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  return response.json();
}

async function sendMail(message:string, recipient:string) {
  try {
    const messageParams = {
        from: process.env.EMAIL_FROM,
        to: recipient,
        subject: "You've got a credential!",
        html: message
      }
    await transporter.sendMail(messageParams)
  } catch (error) {
    console.log('the email send error: ')
    console.log(error)
  }
}



