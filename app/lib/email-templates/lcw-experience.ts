export const getLCWExperienceEmail = (claimPageLink:string, earnerName: string) =>  {
    return `<html>
  <body>

    <p>Dear ${earnerName}! </p>
    
    <p>Your DCC LCW Experience Badge is ready for you to claim. This simple badge iintends to demonstrate how an Open Badge 3.0 is digitally signed and issued to a wallet like the LCW on demand.</p>
    
    <p>To claim your LCW Experience Badge, download the <a clicktracking="off" href="https://lcw.app/">Learner Credential Wallet</a> on your mobile device, and follow the instructions at this personalized url to add the credential to your wallet: <a clicktracking="off" href="${claimPageLink}">${claimPageLink}</a>. Please note that this link will be valid for 30 days</p>

    <p>Best Always</p>
    <p>The Digital Credentials Consortium</p>
    
  </body>
`
}