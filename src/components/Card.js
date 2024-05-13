import { backendHost } from '@/config/endpoints';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/LandingPageImage.png';
import { removeHTML } from '@/utils/cleaning';

export default function CourseSpotlight({ course }) {
  const { Course, meta, Technical_Information, Course_Instance } = {
    ...course,
  };
  const config = useConfig();
  const router = useRouter();
  const { user } = useAuth();

  const thumbnail = useMemo(() => {
    return (
      Course_Instance?.Thumbnail ||
      Technical_Information?.Thumbnail ||
      (config?.data.course_img_fallback &&
        `${backendHost}${config?.data.course_img_fallback}`) ||
      null
    );
  }, [Course_Instance, Technical_Information, config]);

  const handleClick = useCallback(
    (e) => {
      if (!user)
        return router.push(`/course/${meta?.metadata_key_hash || meta?.id}`);

      const context = {
        actor: {
          first_name: user?.user?.first_name,
          last_name: user?.user?.last_name,
        },
        verb: {
          id: 'https://w3id.org/xapi/tla/verbs/explored',
          display: 'explored',
        },
        object: {
          id: `${window.origin}/course/${meta.id}`,
          definitionName: Course?.CourseTitle,
          description: Course?.CourseShortDescription,
        },
        resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
        resultExtValue: meta?.metadata_key_hash || meta?.id,
      };
      xAPISendStatement(context);
      router.push('/course/' + (meta.metadata_key_hash || meta.id));
    },
    [Course, meta, user]
  );

  return (
    <Link href={`/course/${meta.metadata_key_hash || meta.id}`} passHref>
        <div className="h-96 w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src='@/public/LandingPageImage.png' alt="" />
                <Image src={image} height={900} alt='' />
                {thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={thumbnail}
                    alt=''
                    className='h-8 w-12 absolute bottom-0 right-0 m-2'
                />
                )}
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{Course.CourseTitle}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
                {/* line-clamp-3  */}
                    {removeHTML(Course.CourseShortDescription)} </p>
                <span className='font-semibold'>Provider:&nbsp;</span>
                {Course.CourseProviderName}
                <div className='flex flex-row'>
                    <p className='font-semibold'>Course Level: &nbsp;</p>
                    <p>{Course.CourseLevel}</p>
                </div>
            </div>
        </div>
    </Link>
  );
}
