## Digital Credentials Consortium Verifiable Credential Lab

****IN-PROGRESS****


https://badging.dcconsortium.org/collect?recipientName=James+Chartrand

A laboratory in which you can issue credentials, view them, verify them, revoke them, and learn along the way.

The issuance part uses the the Digital Credential Consortium issuing services, fronted by a simple NextJS React UI and a backend api endpoint that acts as a controller to:

- verify the incoming data
- populate a VC with a selected template
- setup a VC-API exchange endpoint and return a deeplink and CHAPI query
- verify the subsequent DIDAuth submission from a wallet (like the DCC Learner Credential Wallet)
- sign the credential
- return the credential

There is also a standalone page with a form for self-issuing an 'LCW Experience Badge'.  A running instance of that
page is [here](https://badging.dcconsortium.org/lcw-experience-badge).

And if you want to skip the form and just go directly to a collection page for a preset name (Taylor Tuna), you can do that [here](https://badging.dcconsortium.org/collect?recipientName=Taylor+Tuna).


