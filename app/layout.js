import '@/app/_styles/globals.css';
import Header from '@/app/_components/Header';
import { ReservationProvider } from '@/app/_contexts/ReservationContext';

import { Josefin_Sans } from 'next/font/google';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: 'The Wild Oasis / %s',
    default: 'The Wild Oasis / Welcome',
  },
  description:
    'Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} vsc-initialized relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />

        <main className='grid flex-1 px-8 py-12'>
          <div className='mx-auto w-full max-w-7xl'>
            <ReservationProvider>{children}</ReservationProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
