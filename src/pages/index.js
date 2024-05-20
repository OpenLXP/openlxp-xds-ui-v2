import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Header from '@/components/Header';
import Image from 'next/image';
import React, { useCallback } from 'react';
// import SearchBar from '@/components/inputs/SearchBar';
// import logo from '@/public/logo.png';
import image from '@/public/LandingPageImage.png';
import useSpotlightCourses from '@/hooks/useSpotlightCourses';
import CourseSpotlight from '@/components/cards/SpotlightCard';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const spotlight = useSpotlightCourses();
  const popuarTopics = ["Cyber Security", "Web Developement", "Communications", "Artificial Intelligence", "Management Styles", "Agile Methodology", "Angular", "Leadership", "Data Science", "Unclassified Information", "Python"]
  
  return (
    <>
      <Head>
        <title>Experience Discovery Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className='flex flex-row w-full'>
        <div className='pt-48 bg-gradient-to-b from-purple-custom to-blue-custom w-1/2'>
          <div className='pt-5'>
            <div className='pt-5 max-w text-5xl text-white font-bold text-center'>WELCOME TO ECC</div>
            <div className='pt-4 text-white text-2xl text-center'>Discover Courses that Enhance Your Career</div>
            <div className='pt-2 text-white text-md italic text-center'>Search for courses related to your career pathway in seconds with the Enterprise Course Catalog. </div>
          </div>
        </div>
        <Image src={image} height={700} width={900} alt='' />
      </div>

      <div className='h-screen my-auto pb-20'>
        <div className='pt-32 max-w text-4xl text-center'> POPULAR PICKS</div>
        <div className='pt-2 max-w text-xl text-blue-custom text-center'> Explore a collection of courses hand-picked by our course providers</div>
        <div className='flex flex-col justify-center w-full mt-4 px-2 max-w-7xl mx-auto'>
          <div className='inline-flex overflow-x-auto gap-6 pb-4 custom-scroll'>
            {spotlight.data && spotlight.data?.map((course) => {
              return <CourseSpotlight course={course} key={course.meta.id} />;
            })}
          </div>
        </div>
      </div>

      <div className='h-screen relative my-auto pb-20 bg-gradient-to-b from-blue-custom to-purple-custom'>
        <div class="container relative">
          <div className='opacity-20 w-screen'> 
            <Image src={image} height='1500' alt='' />
          </div>

          <div class="w-1/3 h-32 absolute top-28 left-2/3 rounded-lg text-white text-3xl text-center font-bold p-4">
            HOW IT WORKS
          </div>

          <div class="bg-white w-1/3 h-32 absolute top-1/4 left-2/3 rounded-[20px] p-6 flex flex-row">
            <svg className="w-10 h-10 mr-4 mt-5 text-blue-custom dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <div className='flex flex-col'>
              <div className='text-blue-custom text-xl font-bold '>Search</div>
              <div className='text-md text-blue-custom'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</div>
            </div>
          </div>

          <div class="bg-white w-1/3 h-32 absolute top-1/2 left-2/3 rounded-[20px] p-6 flex flex-row">
            <svg className="w-12 h-12 mr-4 mt-4 text-blue-custom dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <div className='flex flex-col'>
              <div className='text-blue-custom text-xl font-bold '>Personalize</div>
              <div className='text-md text-blue-custom'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</div>
            </div>
          </div>
          
          <div class="bg-white w-1/3 h-32 absolute bottom-28 left-2/3 rounded-[20px] p-6 flex flex-row">
            <svg className="w-12 h-12 mr-4 mt-4 text-blue-custom dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <div className='flex flex-col'>
              <div className='text-blue-custom text-xl font-bold '>Learn</div>
              <div className='text-md text-blue-custom'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-3/4 my-auto p-48'>
        <div className='max-w text-4xl text-center'> POPULAR TOPICS</div>
        <div className='flex flex-col mx-auto'>
          <div className='w-full mt-8 px-2 max-w-7xl mx-auto overflow-y-auto pb-4 justify-center items-center justify-items-center place-content-center'>
            {popuarTopics.map((topic) => {
              return <Button children={topic} id={topic} onClick={() => router.push(`/search?keyword=${topic}&p=1`)}/>
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
