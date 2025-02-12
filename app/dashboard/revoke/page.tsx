
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Revoke a Verifiable Credential',
};

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Form will go here to accept a credential uuid and revoke it. Might think about providing some other
        token at issuance time that has to be presented at revocation time. Just a bit more security even
        though this is all open anyhow.
      </h1>
      
    </main>
  );
}
