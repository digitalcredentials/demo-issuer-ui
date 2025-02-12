## Digital Credentials Consortium Verifiable Credential Lab

****IN-PROGRESS****

A laboratory in which you can issue credentials, view them, verify them, revoke them, and learn along the way.

The issuance part uses the the Digital Credential Consortium issuing services, fronted by a simple NextJS React UI and a backend api endpoint that acts as a controller to:

- verify the incoming data
- populate a VC with a selected template
- setup a VC-API exchange endpoint and return a deeplink and CHAPI query
- verify the subsequent DIDAuth submission from a wallet (like the DCC Learner Credential Wallet)
- sign the credential
- return the credential

