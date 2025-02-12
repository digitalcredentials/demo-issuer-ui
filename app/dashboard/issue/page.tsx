
import Form from '@/app/ui/issue/issue-form';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Issue a Verifiable Credential',
};

export default async function Page() {
  

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Issue a Verifiable Credential
      </h1>
      <Form />
    </main>
  );
}
