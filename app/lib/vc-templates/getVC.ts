import { bachelorsVC } from "./bachelors"

const testVC = { "@context": ["https://www.w3.org/2018/credentials/v1"], "type": ["VerifiableCredential"], "credentialSubject": { "id": "did:key:z6MkhTNL7i2etLerDK8Acz5t528giE5KA4p75T6ka1E1D74r" }, "issuanceDate": "2024-10-04T13:38:11Z", "id": "urn:uuid:31eadc58-e125-43bc-9abc-113fd93f4c3f", "issuer": "did:key:z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q" }

const addExpiry = (vc: any, expiry: number) => {
  let expiryDate = new Date()
  switch (expiry) {
    case 1:
      // 1 minute
      expiryDate.setMinutes(expiryDate.getMinutes() + 1);
    case 2:
      // 30 minutes
      expiryDate.setMinutes(expiryDate.getMinutes() + 30);
    case 3:
      // 1 day
      expiryDate.setDate(expiryDate.getDate() + 1);
    case 4:
      // 1 week
      expiryDate.setDate(expiryDate.getDate() + 7);
    case 5:
      // 1 month
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    case 6:
      // 1 year
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    default:
    // do nothing
  }
  vc.expirationDate = expiryDate.toISOString();   //": "2025-01-09T16:23:24Z",
}

const getVCFor = (data: any) => {
  let vc: any
  switch (data.credentialType) {
    case 'bachelor':
      vc = bachelorsVC
      break;
    default:
    // nothing for now
  }
  vc = JSON.parse(JSON.stringify(vc))
  vc.credentialSubject.name = data.recipientName
  addExpiry(vc, data.expiry);
  return vc
}

export { testVC, getVCFor };
