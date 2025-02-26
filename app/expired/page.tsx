'use client'

import Image from 'next/image';

export default function Page() {

  return (
    <main className="flex items-center flex-col justify-center md:h-screen ">
      <div className="relative mx-auto max-w-[400px] p-4 md:-mt-10">
                      <Image
                        src="/lcw-badge-image.png"
                        width={400}
                        height={400}
                        alt="lcw badge image"
                        className="block"
                      />
      </div>
      <div className=" max-w-[600px] space-y-2.5 p-4 md:-mt-10 text-center">
                      <br/><br/>
                      Your claim page link has expired. 
                      <br/><br/>
                      If you haven't yet added your credential to your wallet please click the link again in the original notificaiton email you were sent.
      </div>

    </main>
  );
}
