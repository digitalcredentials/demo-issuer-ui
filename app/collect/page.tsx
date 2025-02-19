'use client'

import AcmeLogo from '@/app/ui/dcc-logo';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
//import QRCode from "react-qr-code";

export default function Page() {

  const searchParams = useSearchParams()
 
  const exchangeId = searchParams.get('exchange')
  const transactionId = searchParams.get('transaction')

  const deepLink = `https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=50991c0d-e033-49c4-86aa-7f3620cf6937&vc_request_url=https://issuer.dcconsortium.org/exchange/${exchangeId}/${transactionId}`
  
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
            Collect your credential!!!!!! Deep link and QR and mayber chapi will go here.
            <a href={`${deepLink}`}>Add your credential to the Learner Credential Wallet</a>
            
        </Suspense>
      </div>
    </main>
  );
}

// <QRCode value={deepLink} />