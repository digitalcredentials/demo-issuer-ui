import Form from '@/app/ui/issue/issue-form-lcw';
import Image from 'next/image';

export default function Page() {
  return (

    <main className="flex flex-col items-center md:h-screen w-screen">
      <div className="mx-auto flex gap-4 items-center max-w-screen-lg flex-col space-y-2.5 p-4">
        <div className="text-3xl font-medium">Digital Credentials Consortium</div>
        <div className="text-3xl font-medium">LCW Experience Badge</div>
                      <Image
                        src="/lcw-badge-image.png"
                        width={220}
                        height={220}
                        alt="Screenshot of the dashboard project showing mobile version"
                        className="block m-50"
                      />
        <div className="max-w-[600px] text-lg font-medium">The LCW Experience Badge provides a hands-on way to experience the issuing of an Open Badges 3.0 badge in the Learner Credential Wallet. </div>          
        <p className="max-w-[600px] text-lg font-medium">After entering your name and email address, you will be sent an email with instructions on how to claim your badge. </p>
       
      </div>
      <div className="min-w-[500px] mt-8">
          <Form />
      </div>
    </main>



  );
}