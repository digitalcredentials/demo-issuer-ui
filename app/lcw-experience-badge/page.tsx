import Form from '@/app/ui/issue/issue-form-lcw';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (

    <main className="flex flex-col items-center md:h-screen w-screen">
      <div className="mx-auto flex md:gap-4 items-center max-w-screen-lg flex-col space-y-2.5 p-4">
        <div className="text-l md:text-3xl font-medium">Digital Credentials Consortium</div>
        <div className="text-l md:text-3xl font-medium">LCW Experience Badge</div>
        <Image
          src="/lcw-badge-image.png"
          width={220}
          height={220}
          alt="Screenshot of the dashboard project showing mobile version"
          className="block md:m-50"
        />
        <div className="max-w-[800px] text-sm md:text-base font-medium">The Learner Credential Wallet (LCW) Experience is an introduction to the experience of receiving, claiming, and storing of an Open Badges 3.0 badge to the Learner Credential Wallet. Please  <Link className="font-extrabold text-gray-800 transition-colors hover:bg-gray-200" href="#explainer">read below</Link> to learn more about how this works. </div>
       

        <p className="max-w-[800px] text-sm md:text-base font-medium">Steps to earn this badge:</p>

        <ol className="list-disc ml-5 p-1">
        <li>Install the <Link className="font-extrabold text-gray-800 transition-colors hover:bg-gray-200" href="https://lcw.app/" target="_blank">Learner Credential Wallet</Link> and follow set-up instructions in the app.</li>
        <li>Enter your name and email address in the fields below and click the "Award Badge" button.</li>
        </ol>
        

        <p className="max-w-[800px] text-sm md:text-base font-medium">You will be sent an email with instructions on how to claim your badge.</p>

        <p className="max-w-[800px] text-sm md:text-base font-medium"><i>Please note that the DCC is not saving this information, only using it to generate and issue this badge to you.</i></p>

      </div>
      <div className="md:min-w-[500px] md:mt-4">
        <Form />
      </div>

      <div className="max-w-[800px] text-base md:text-base font-bold mt-8 md:mt-10 mb-1 md:mb-4" id="explainer">
        How does this work?
      </div>

      <div className="max-w-[800px] text-sm md:text-base font:medium flex flex-col gap-3 space-y-2.5 p-4">

        <p>
          The email notification you receive is similar to what a credentialing platform would send to an individual who has been awarded an Open Badges 3.0 digital credential. In this case the achievement type is a badge. At the time the badge is awarded, it does not exist yet. It is just information that is compiled into a structure that follows the Open Badges 3.0 standard.
        </p>

        <p>
          The link in the email is created for your badge based on the name that you entered above. When you click on it, a web page will open that explains how to use the Learner Credential wallet to claim this badge for yourself.
        </p>

        <p>
          Download the Learner Credential Wallet on your mobile device and follow the set up instructions. During this set up, the wallet will create a default profile with a digital identity called a Decentralized Identifier (DID). When the wallet is ready for you to add credentials, follow the instructions on your claim page to click on a link or scan the QR code with your device’s camera or the from the LCW’s “Add Credential” screen (“Scan QR code” button).
        </p>

        <p>
          The link and QR code will open the LCW. Almost instantaneously you will be asked if you want to accept the LCW badge but quite a bit happens between when you click on that link and when you see that pop up.
        </p>

        <p>
          When you click on the link, the DCC issuing system sends a request to the wallet that tells it that it has a credential to send. The wallet sends the DID for your profile back to the issuing system. Then the issuing system compiles the awarded badge into the LCW Experience badge with your DID included, digitally signs the badge, and sends it to the wallet for you to accept.
        </p>

        <p>
          When you accept it, you will see a green check mark indicating that it has been verified. This means that:
        </p>

        <ul className="list-disc ml-5 p-1">
        <li>the badge was signed properly</li>
        <li>the badge data hasn’t been changed since it was signed.</li>
</ul>

        <p>
          The LCW also checks that
        </p>

        <ul className="list-disc ml-5 p-1">
          <li>the identity issuer of the badge (DCC) has been substantiated (that is a DID too!)</li>
          <li>the badge hasn’t been revoked</li>
          <li>it hasn’t expired</li>
        </ul>

        <p>
          Your LCW Experience badge doesn’t exist until you request it. Once it is in your wallet, it is yours to share with others however you choose.
        </p>

        <p>
          To share your badge, click done and go to the home screen. Click on your badge and look for three vertical dots in the top right corner. When you click on the dots, you will see the option to share. This will take you to a screen where you can choose to create a public url to share your badge with anyone and an option to post the badge on your LinkedIn profile.
        </p>

        <p className='font-extrabold'>
          Note about Privacy:
        </p>

        <p>
          The DCC does not save any of your information when creating and issuing this badge. The LCW does not track any use of the app or where you share the link that you create. The link is hosted at our web verifier app called VerifierPlus where your badge can be verified by anyone in real-time. The public link on VerifierPlus is needed because it isn’t possible to host a web page on a mobile device. VerifierPlus does hold onto the badge data for as long as the link exists but note that you can destroy the link at any time in the LCW on the share screen for your badge and this will delete it from VerifierPlus too. As with the LCW, VerifierPlus does not track where you share this link. The DCC believes that we should all have unfettered access to our data and be able to share it privately so we try our best to make that possible with our software.
        </p>

      </div>
      <div className="p-10">
      <a href="https://digitalcredentials.mit.edu" target="_blank">
        <Image
          src="/DCC-logo.png"
          width={175}
          height={54}
          alt="DCC Logo"
          className="block md:m-50"
        />
        </a>
      </div>
    </main>

  );
}