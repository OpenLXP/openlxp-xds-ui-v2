import React from 'react';
import image from '@/public/FooterImage.png';
import Image from 'next/image';


export default function Footer({ location }) {
  const leftLinks = [
    {
        name: 'Privacy and Security',
        url: 'https://dodcio.defense.gov/Home/Privacy-Policy.aspx',
    },
    { name: 'Section 508', url: '' },
    { name: 'Web Policy', url: 'https://dodcio.defense.gov/DoD-Web-Policy/' },
    { name: 'No Fear Act', url: '' },
    { name: 'Open Gov', url: '' },
    { name: 'USA.gov', url: '' },
    { name: 'ADL', url: 'https://adlnet.gov/' },
    { name: 'FOIA', url: '' },
  ];
  const Section1 = [
    {
      name: 'Privacy',
      url: 'https://dodcio.defense.gov/Home/Privacy-Policy.aspx',
    },
    { name: 'Contact US', url: 'https://dodcio.defense.gov/Contact/' },
    { name: 'Section 508', url: '' },

  ];

  const Section2 = [
    { name: 'Web Policy', url: 'https://dodcio.defense.gov/DoD-Web-Policy/' },
    { name: 'No Fear Act', url: '' },
    { name: 'Open Gov', url: '' },
  ];

  const Section3 = [
    { name: 'USA.gov', url: '' },
    { name: 'ADL', url: 'https://adlnet.gov/' },
    { name: 'FOIA', url: '' },
  ];

  const makeExternalLinks = (links) =>
    links.map((link, index) => {
      return (
        <a
          key={index}
          className='text-center text-white text-base p-1 hover:font-bold h-auto hover:text-shadow-md transform transition-all duration-75 ease-in-out'
          href={link.url}
        >
          {link.name}
        </a>
      );
    });

  return (
    <div className='mt-10 bottom-0 bg-opacity-90 w-full mx-auto z-50'>
        <div className='h-48 bg-blue-custom mx-auto px-4 pl-8'> 
            <div className={'w-full py-4 inline-flex items-center justify-between'}>
            <div className={'flex gap-20'}>
                <div className='flex flex-col text-left items-start'>
                    <p className='text-lg font-bold text-white'>Section 1 Header</p>
                        {makeExternalLinks(Section1)}                     
                </div>
                <div className='flex flex-col text-left items-start'>
                    <p className='text-lg font-bold text-white'>Section 2 Header</p>
                        {makeExternalLinks(Section2)}                     
                </div>
                <div className='flex flex-col text-left items-start'>
                    <p className='text-lg font-bold text-white'>Section 3 Header</p>
                        {makeExternalLinks(Section3)}                     
                </div>
                <div className='flex flex-col text-left items-start'>
                    <p className='text-lg font-bold text-white'>Section 4 Header</p>
                        {makeExternalLinks(Section1)}                     
                </div>
 
            </div>
            <div className={'flex flex-col items-right mr-40 w-80'}>
                <div className='px-20'>
                    <Image src={image} height={80} width={130} alt='' />

                </div>
                <p className='text-white line-clamp-3'> 
                    The Department of Defense provides the military forces needed to deter war and ensure our nation's security.
                </p>
            </div>
            </div>
        </div>
      <nav className={'mx-auto px-4 sm:px-6 bg-header-blue pl-8'}>
        <div className={'w-full py-4 inline-flex items-center justify-between'}>
          <div className={'flex items-center gap-4'}>
            {makeExternalLinks(leftLinks)}
          </div>

        </div>
      </nav>
    </div>
  );
}
