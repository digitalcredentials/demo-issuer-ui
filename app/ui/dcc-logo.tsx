import { lusitana } from '@/app/ui/fonts';

export default function DCCLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px] ">DCC Issuing Lab</p>
    </div>
  );
}
