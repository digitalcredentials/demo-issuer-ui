import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from "react-qr-code";
import TimeOut from '@/app/ui/collect/timeout';

import { getDeepLink } from '@/app/lib/deepLinkAction';

async function DeepLinks({ recipientName }: { recipientName: string }) {

  //const deepLink = `https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=${transactionId}&vc_request_url=https://issuer.dcconsortium.org/exchange/${exchangeId}/${transactionId}`
  const deepLink = await getDeepLink(recipientName)

  return (
    <div className="flex flex-col gap-3 m-10">

      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        {`${recipientName}, this is where you can claim your LCW Experience Badge. Here’s how it works:`}
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        1. Download and install the Learner Credential Wallet
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        2. If you are viewing this page on your phone then click here to add your credential to the Learner Credential Wallet:<br />
      </div>
      <div className="m-5 flex justify-center gap-4">
        <Link href={`${deepLink}`} className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Add to LCW</Link>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
      If you are viewing this page on a computer screen, scan this QR from your phone camera:

      </div>
      <div className="mt-6 mb-5 flex justify-center align-middle">
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={deepLink}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        3. This will open the wallet app where you will see an offer to accept this badge.
        <div className="mx-6 mt-2 p-3 bg-slate-100 italic font-sans text-sm"> In the background, the wallet will tell the issuing system the digital identity associated with your wallet. Then, the issuer will add that identity to your badge data, digitally sign it and send it back to your wallet where you can choose to accept it.
        </div>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        4. Once you have accepted your badge, click on “Done” to return to the home screen where you will see your badge listed. 
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
      5. If you would like to share your badge on the web, click on your badge and look for three vertical dots in the top right corner. When you click on the dots, you will see the option to share. This will take you to a screen where you can choose to create a public url to share your badge with anyone and an option to post the badge on your LinkedIn profile. 
      </div>
    </div>)
}

export default async function Page(props: {
  searchParams?: Promise<{
    recipientName?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const recipientName = searchParams?.recipientName || '';

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
      </div>
      <div className="md:min-w-[500px] md:mt-4">
        <Suspense>
          <br />
          <DeepLinks recipientName={recipientName} />
        </Suspense>
      </div>

      <TimeOut />
    </main>
  );
}
