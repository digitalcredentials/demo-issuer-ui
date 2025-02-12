import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Welcome to the Digital Credentials Consortium Issuing Services Lab where you can experiment with
        issuing, collecting, viewing, verifying and revoking credentials.
      </h1>
    </main>
  );
}
