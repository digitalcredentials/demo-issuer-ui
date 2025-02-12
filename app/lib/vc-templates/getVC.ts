import { bachelorsVC } from "./bachelors"

const signedVC = {
    "verifiableCredential": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json",
        "https://w3id.org/security/suites/ed25519-2020/v1"
      ],
      "id": "urn:uuid:2fe53dc9-b2ec-4939-9b2c-0d00f6663b6c",
      "type": ["VerifiableCredential", "OpenBadgeCredential"],
      "name": "DCC Test Credential",
      "issuer": {
        "type": ["Profile"],
        "id": "did:key:z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q",
        "name": "Digital Credentials Consortium Test Issuer",
        "url": "https://dcconsortium.org",
        "image":
          "https://user-images.githubusercontent.com/752326/230469660-8f80d264-eccf-4edd-8e50-ea634d407778.png"
      },
      "issuanceDate": "2023-08-02T17:43:32.903Z",
      "credentialSubject": {
        "type": ["AchievementSubject"],
        "achievement": {
          "id": "urn:uuid:bd6d9316-f7ae-4073-a1e5-2f7f5bd22922",
          "type": ["Achievement"],
          "achievementType": "Diploma",
          "name": "Badge",
          "description":
            "This is a sample credential issued by the Digital Credentials Consortium to demonstrate the functionality of Verifiable Credentials for wallets and verifiers.",
          "criteria": {
            "type": "Criteria",
            "narrative":
              "This credential was issued to a student that demonstrated proficiency in the Python programming language that occurred from **February 17, 2023** to **June 12, 2023**."
          },
          "image": {
            "id": "https://user-images.githubusercontent.com/752326/214947713-15826a3a-b5ac-4fba-8d4a-884b60cb7157.png",
            "type": "Image"
          }
        },
        "name": "Jane Doe"
      },
      "proof": {
        "type": "Ed25519Signature2020",
        "created": "2023-10-05T11:17:41Z",
        "verificationMethod":
          "did:key:z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q#z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q",
        "proofPurpose": "assertionMethod",
        "proofValue":
          "z5fk6gq9upyZvcFvJdRdeL5KmvHr69jxEkyDEd2HyQdyhk9VnDEonNSmrfLAcLEDT9j4gGdCG24WHhojVHPbRsNER"
      }
    }
  }

  const testVC = {"@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential"],"credentialSubject":{"id":"did:key:z6MkhTNL7i2etLerDK8Acz5t528giE5KA4p75T6ka1E1D74r"},"issuanceDate":"2024-10-04T13:38:11Z","id":"urn:uuid:31eadc58-e125-43bc-9abc-113fd93f4c3f","issuer":"did:key:z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q"}
  
  const templateVC = {"@context":["https://www.w3.org/2018/credentials/v1"],"type":["VerifiableCredential"],"credentialSubject":{"id":"did:key:z6MkhTNL7i2etLerDK8Acz5t528giE5KA4p75T6ka1E1D74r"},"issuanceDate":"2024-10-04T13:38:11Z","id":"urn:uuid:31eadc58-e125-43bc-9abc-113fd93f4c3f","issuer":"did:key:z6MknNQD1WHLGGraFi6zcbGevuAgkVfdyCdtZnQTGWVVvR5Q"}
  

  const getPopulatedBachelors = (data:any) => {
    const populatedBachelors = JSON.parse(JSON.stringify(bachelorsVC))
    populatedBachelors.credentialSubject.name = data.recipientName
  }


  const addExpiry = (vc:any,expiry:number) => {
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
    
  }

  const getVCFor = (data:any) => {
    let result : any
    switch(data.credentialType) {
      case 'degree': 
        result = getPopulatedBachelors(data)
        break;
      default:
        // nothing for now
    }
    addExpiry(result,data.expiry);
    return result
  }

export { testVC, signedVC, getVCFor };
