import { lusitana } from '@/app/ui/fonts';

export default function DCCLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[28px] text-center ">DCC Verifiable Credentials Learning Lab</p>
    </div>
  );
}
