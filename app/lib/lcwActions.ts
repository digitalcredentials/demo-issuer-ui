'use server';

import { z } from 'zod';
import { getLCWBadge } from './vc-templates/getVC';
import { getLCWExperienceEmail } from './email-templates/lcw-experience';
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
  email: z.string().email()
});

const timeToLive = 2592000000  // 30 days
const tenantName = 'test'

export type State = {
  errors?: {
    recipientName?: string[];
    email?: string[];
  };
  message?: string | null,
  signedVC?: any,
  deepLink?: any,
  data: {
    recipientName?: string,
    email?: string
  }
};

async function issueToLCW(vc:object, email:string, earnerName:string):Promise<any> {
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
    const emailContent = getLCWExperienceEmail(deepLink.collectionPageURL, earnerName)
    sendMail(emailContent, email)
    return {deepLink}
      
}




export async function issueCredential(prevState: State, formData: FormData) {

  const recipientName = formData.get('recipientName')
  const email = formData.get('email')

  const data = {recipientName, email}

  const validatedFields = FormSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields - complete them so we can get you your credential!",
    };
  }

  const vc = getLCWBadge(validatedFields.data)

  let result;
  try {
    result = await issueToLCW(vc, validatedFields.data.email, validatedFields.data.recipientName)   
  } catch (error) {
    console.log(error)
    result = {
      message: 'Error: Failed to issue.',
    };
  }
  const finalResult :any = {data, ...result};

  return finalResult;
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



