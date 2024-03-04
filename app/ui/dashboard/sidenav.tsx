import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

        <div className="hidden pb-20 pt-10 md:block">
          <Image
            width={500}
            height={500}
            src={'/marvellogo.png'}
            alt={'Marvel'}
            className="hidden md:block"
          />
        </div>

      <div className=" bg-gray flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
        <form>
          <Link href="/">
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-red-300 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sair</div>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
