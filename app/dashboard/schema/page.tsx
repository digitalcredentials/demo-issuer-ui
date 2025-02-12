
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Check the schema and context of a draft Verifiable Credential',
};

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        A screen on which to check the validity of a credential, kind of like the jsonlint.com page.
      </h1>
      
    </main>
  );
}
