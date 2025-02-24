'use client'

import DCCLogo from '@/app/ui/dcc-logo';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

import QRCode from "react-qr-code";

function DeepLinks() {
  const searchParams = useSearchParams()
  const exchangeId = searchParams.get('exchangeId')
  const transactionId = searchParams.get('transactionId')
  const deepLink = `https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=${transactionId}&vc_request_url=https://issuer.dcconsortium.org/exchange/${exchangeId}/${transactionId}`
  
  return (
    <div>
      If you are viewing this page on your phone then click here to add your credential to the Learner Credential Wallet:
      <div className="mt-6 flex justify-start gap-4">
      <Link href={`${deepLink}`} className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Add to LCW</Link><br/><br/>
      </div>
      <br/>
       If you aren't on your phone, scan this QR from your phone camera:
      <br/><br/>
      <QRCode value={deepLink} />
    </div>)
}

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <DCCLogo/>
          </div>
        </div>
        <Suspense>
        <br/><br/>
            You've earned a credential! <br/><br/>
            <DeepLinks/>
        </Suspense>
      </div>
    </main>
  );
}
