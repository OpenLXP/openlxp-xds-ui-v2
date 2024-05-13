import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// import UserMenu from '@/components/menus/UserMenu';
import logo from '@/public/logo.png';
// import Notifications from './menus/Notifications';
import useField from '@/hooks/useField';
import { useCallback, useEffect, useState } from 'react';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';


const menuItems = [
  {
    label: 'Explore',
    path: '/',
  },
  {
    label: 'FAQs',
    path: '/support',
  },
];

function Button({ data }) {
  const router = useRouter();
  if (data.path === router?.asPath) {
    return (
      <Link href={data.path}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className='py-2 px-2 font-bold text-white border-b-2 border-purple-custom hover:text-purple-custom'>
          {data.label}
        </a>
      </Link>
    );
  }
  return (
    <Link href={data.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className='py-2 px-2 transition-all duration-100 px-1 border-b-2 border-transparent text-white hover:text-purple-custom'>
        {data.label}
      </a>
    </Link>
  );
}

// const { fields, updateKeyValuePair, resetKey } = useField({
//   keyword: '',
//   p: 1,
// });

// const handleSearch = useCallback(
//   (e) => {
//     if (!fields.keyword || fields.keyword === '') return;
//     const context = {
//       actor: {
//         first_name: user?.user?.first_name || 'Anonymous',
//         last_name: user?.user?.last_name || 'User',
//       },
//       verb: {
//         id: 'https://w3id.org/xapi/acrossx/verbs/searched',
//         display: 'searched',
//       },
//       object: {
//         definitionName: 'ECC Search Capability',
//       },
//       resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
//       resultExtValue: fields.keyword,
//     };
//     xAPISendStatement(context);
//     router.push({ pathname: '/search/', query: fields });
//   },
//   [fields, user]
// );

// const handleChange = (event) => {
//   updateKeyValuePair(event.target.name, event.target.value);
// };

export default function Header() {
  const { user } = useAuth();
  return (
    <header className={'bg-header-blue w-full shadow z-50'}>
      <nav
        className={' mx-auto px-4 sm:px-6 lg:px-8'}
        aria-label={'Top'}
      >
        <div className='w-full py-4 inline-flex items-center justify-between z-50'>
          <div className={'flex items-center justify-start gap-4 w-1/2'}>
            <Link href={'/'} passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <button
                title='home'
                id={'homepage-button'}
                className={'cursor-pointer'}
              >
                <Image src={logo} alt={'home'} height={'60'} width={'60'} />
              </button>
            </Link>

            <form className="w-full gap-2 " 
              // onSubmit={(event) => { event.preventDefault(); onClick(handleSearch);}}
            > 
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="px-2 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                    // onChange={handleChange}
                    className="block w-full px-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What would you like to learn?" required />
                    {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                </div>
            </form>

          </div>
          <div className='flex flex-row gap-4 '>
          {menuItems.map((item) => {
                return <Button key={item.label} data={item} />;
              
            })}
          {!user ? (
            <div className='space-x-4 flex flex-row'>
              <Link href={'/register'} passHref>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-600 hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-blue-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-header-blue dark:bg-gray-900 rounded-md hover:bg-opacity-0 border-2 border-white text-white hover:bg-gradient-to-b hover:from-purple-custom hover:to-blue-custom">
                    Create Account
                  </span>
                </button>
              </Link>
              <Link href={'/login'} passHref>
                <button type="button" className="text-white bg-purple-custom hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log In</button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-row'>
              {/* <Notifications /> */}
              {/* <div className='m-4'> <UserMenu /> </div> */}
            </div>
          )}
          </div>
        </div>
      </nav>
    </header>
  );
}
