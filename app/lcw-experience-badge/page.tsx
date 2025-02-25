import Form from '@/app/ui/issue/issue-form-lcw';
import { Suspense } from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <div>
    <div className="text-center"><div className="text-3xl font-medium">Digital Credentials Consortium</div>

    LCW Experience Badge
    </div>
    <main className="flex items-center justify-center md:h-screen">
     
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      
          <div className="w-300 md:w-300">
        
                      <Image
                        src="/lcw-badge-image.png"
                        width={300}
                        height={300}
                        alt="Screenshot of the dashboard project showing mobile version"
                        className="block"
                      />

          </div>
          <p className="text-lg font-medium">The LCW Experience Badge provides a hands-on way to experience the issuing of an Open Badges 3.0 badge in the Learner Credential Wallet. </p>
                    
                    <p className="text-lg font-medium">After entering your name and email address, you will be sent an email with instructions on how to claim your badge. </p>
        <Suspense>
          <Form />
        </Suspense>
      </div>
    </main>
    </div>
  );
}