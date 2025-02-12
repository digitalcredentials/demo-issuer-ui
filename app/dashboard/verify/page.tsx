
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Verify a Verifiable Credential',
};

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Verifies a VC in the same way it is verified in LCW and V+. Ideally would have a react component
        for this that others can reuse.
      </h1>
      
    </main>
  );
}
