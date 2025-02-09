import { Inter } from 'next/font/google';
import ReviewApp from '@/components/ReviewApp';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24 ${inter.className}`}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8">Review App</h1>
      <ReviewApp />
    </main>
  );
}
