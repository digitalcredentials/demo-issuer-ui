'use server';

import { z } from 'zod';
import { getVCFor } from './vc-templates/getVC';

const exchangeHost = process.env.EXCHANGE_HOST

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
});

const timeToLive = 604800000 // one week
const tenantName = 'test'

export type State = {
  errors?: {
    recipientName?: string[];
    credentialType?: string[];
    revocable?: string[];
    expiry?: string[];
    delivery?: string[];
  };
  message?: string | null,
  signedVC?: any,
  deepLink?: any
};

async function issueToLCW(vc:object):Promise<any> {
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
    console.log(splitOnSlash)
    const transactionId = splitOnSlash.pop()
    const exchangeId = splitOnSlash.pop()
    deepLink.collectionPageURL = `${exchangeHost}/tryit/collect?exchangeId=${exchangeId}&transactionId=${transactionId}`
    console.log("the result:")
    console.log(result)
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
  console.log("the vc:")
  console.log(vc)

  // Call the signing service
  try {
    if (delivery === 'lcw') {
      return issueToLCW(vc)
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


