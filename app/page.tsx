import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex hidden h-20 shrink-0 items-end rounded-lg bg-white p-4 md:block md:h-52">
        <Image src="/marvellogo.png" width={350} height={200} alt="Acme Logo" />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white px-6 py-10 md:w-2/5 md:px-20">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Bem-vindo!
          </h1>
          <h2 className="text-3xl text-gray-800 md:text-2xl">
            Aqui você vai encontrar tudo que precisar sobre o universo Marvel.
          </h2>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700 md:text-base"
          >
            <span>Entrar</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src={'/ironman.png'}
            width={800}
            height={500}
            
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
