
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Preview a Verifiable Credential',
};

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Preview a Verifiable Credential. This page will show the credential as it appears in LCW and V+ and
        maybe also how the render method renders the credential. Could at some point think about
        some of option to fiddle with the html of the render method and see, on the same screen,
        how it turns out in the PDF rendered version.
      </h1>
      
    </main>
  );
}
