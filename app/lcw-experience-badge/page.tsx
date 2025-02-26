import Form from '@/app/ui/issue/issue-form-lcw';
import { Suspense } from 'react';
import Image from 'next/image';

export default function Page() {
  return (
   
    
    <main className="flex flex-col items-center justify-center md:h-screen w-full">
     

      <div className="mx-auto flex items-center max-w-screen-lg flex-col space-y-2.5 p-4">
        <div className="text-3xl font-medium">Digital Credentials Consortium</div>
        <div className="text-3xl font-medium">LCW Experience Badge</div>
       
                      <Image
                        src="/lcw-badge-image.png"
                        width={200}
                        height={200}
                        alt="Screenshot of the dashboard project showing mobile version"
                        className="block"
                      />

        
        <div className="w-200 md:w-200 text-lg font-medium">The LCW Experience Badge provides a hands-on way to experience the issuing of an Open Badges 3.0 badge in the Learner Credential Wallet. </div>          
        <p className="text-lg font-medium">After entering your name and email address, you will be sent an email with instructions on how to claim your badge. </p>
        <Suspense>
          <Form />
        </Suspense>
      </div>
    </main>

  );
}