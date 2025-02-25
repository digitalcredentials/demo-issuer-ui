import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | DCC Verifiable Credentials Learning Lab',
    default: 'DCC Verifiable Credentials Learning Lab',
  },
  description: 'A lab in which to learn about Verifiable Credentials',
  metadataBase: new URL('https://digitalcredentials.mit.edu'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
