'use server';

import { getLCWBadge } from './vc-templates/getVC';

const exchangeHost = process.env.EXCHANGE_HOST

const timeToLive = 300000  // 5 minutes
const tenantName = 'test'

export async function getDeepLink(recipientName:string):Promise<any> {

const vc = getLCWBadge(recipientName)

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
  // deeplinks look like this:
  //https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=50991c0d-e033-49c4-86aa-7f3620cf6937&vc_request_url=https://issuer.dcconsortium.org/exchange/e63007bc-6065-417c-8ae8-6b8fbc6a79df/50991c0d-e033-49c4-86aa-7f3620cf6937
    const result = await postData(`${exchangeHost}/exchange/setup`, dataToPost)
    const deepLink = result[0].directDeepLink;
    return deepLink     
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





