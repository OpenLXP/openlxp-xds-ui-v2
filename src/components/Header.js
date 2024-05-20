import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// import UserMenu from '@/components/menus/UserMenu';
import logo from '@/public/logo.png';
// import Notifications from './menus/Notifications';
import { useCallback, useEffect, useState } from 'react';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import SearchBar from './inputs/SearchBar';
import { unstable_batchedUpdates } from 'react-dom';
import { useSearch } from '@/hooks/useSearch';


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

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const [params, setParams] = useState(router?.query);
  const { setUrl, data, isLoading } = useSearch();

  useEffect(() => {
    if (router?.query) {
      unstable_batchedUpdates(() => {
        setParams(router?.query);
        setUrl(router?.query);
      });
    }
  }, [router.query]);
  
  function handleChange(event) {
    setParams((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();

      // if there is a key word
      if (!params.keyword || params.keyword === '') return;

      // set the start page to 1
      const modified = { ...params };
      modified.p = 1;

      unstable_batchedUpdates(() => {
        setParams(modified);
        setUrl(modified);
      });

      const context = {
        actor: {
          first_name: user?.user?.first_name,
          last_name: user?.user?.last_name,
        },
        verb: {
          id: 'https://w3id.org/xapi/acrossx/verbs/searched',
          display: 'searched',
        },
        object: {
          definitionName: 'ECC Search Capability',
        },
        resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/searchTerm',
        resultExtValue: modified.keyword,
      };

      xAPISendStatement(context);

      router.push({ pathname: '/search', query: modified });
    },
    [params, user]
  );

  function handleReset(key) {
    setParams((prev) => ({ ...prev, [key]: '' }));
  }

  return (
    <header className={'bg-dark-blue w-full shadow z-50'}>
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

            <SearchBar
              parameters={params}
              onChange={handleChange}
              onReset={handleReset}
              onClick={handleSearch}
            />

          </div>
          <div className='flex flex-row gap-4 '>
          {menuItems.map((item) => {
                return <Button key={item.label} data={item} />;
              
            })}
          {!user ? (
            <div className='space-x-4 flex flex-row'>
              <Link href={'/register'} passHref>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-600 hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-white dark:focus:ring-blue-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-dark-blue dark:bg-gray-900 rounded-md hover:bg-opacity-0 border-2 border-white text-white hover:bg-gradient-to-b hover:from-purple-custom hover:to-blue-custom">
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
