import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from "react-qr-code";
import TimeOut from '@/app/ui/collect/timeout';

import { getDeepLink } from '@/app/lib/deepLinkAction';

async function DeepLinks({recipientName}: {recipientName : string}) {
  
  //const deepLink = `https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=${transactionId}&vc_request_url=https://issuer.dcconsortium.org/exchange/${exchangeId}/${transactionId}`
  const deepLink = await getDeepLink(recipientName)

  return (
    <div>
              <br/><br/>
              You've earned a credential!<br/><br/>
      If you are viewing this page on your phone then click here to add your credential to the Learner Credential Wallet:
      <div className="mt-6 flex justify-center gap-4">
      <Link href={`${deepLink}`} className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Add to LCW</Link><br/><br/>
      </div>
      <br/>
       If you aren't on your phone, scan this QR from your phone camera:
      <br/><br/>
      <div className="mt-6 flex justify-center gap-4">
      <QRCode value={deepLink} />
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
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-10">
                      <Image
                        src="/lcw-badge-image.png"
                        width={400}
                        height={400}
                        alt="lcw badge image"
                        className="block"
                      />
                    
                     <Suspense>
 <br/><br/>
            <DeepLinks recipientName={recipientName}/>
        </Suspense>
      </div>
      <TimeOut/>
    </main>
  );
}
