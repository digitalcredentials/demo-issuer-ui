'use client'

import DCCLogo from '@/app/ui/dcc-logo';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import QRCode from "react-qr-code";

function DeepLinks() {
  const searchParams = useSearchParams()
  const exchangeId = searchParams.get('exchangeId')
  const transactionId = searchParams.get('transactionId')
  const deepLink = `https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=${transactionId}&vc_request_url=https://issuer.dcconsortium.org/exchange/${exchangeId}/${transactionId}`
  
  return (
    <div>
      <a href={`${deepLink}`}>Add your credential to the Learner Credential Wallet</a>
      <QRCode value={deepLink} />
    </div>)
}

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <DCCLogo />
          </div>
        </div>
        <Suspense>
            Collect your credential!!!!!! Deep link and QR and mayber chapi will go here.
            <br/><br/>
            <DeepLinks/>
        </Suspense>
      </div>
    </main>
  );
}
