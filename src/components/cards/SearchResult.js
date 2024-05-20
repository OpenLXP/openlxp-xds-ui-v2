import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { xAPISendStatement } from '@/utils/xapi/xAPISendStatement';
import SaveModal from '@/components/modals/SaveModal';
import { useConfig } from '@/hooks/useConfig';


export default function SearchResult({ result }) {
  const { user } = useAuth();
  const router = useRouter();
  const config = useConfig();

  const { Technical_Information, Course_Instance } = {
    ...result,
  };

  const thumbnail = useMemo(() => {
    return (
      result.Course_Instance?.Thumbnail ||
      result.Technical_Information?.Thumbnail ||
      (config?.data.course_img_fallback &&
        `${backendHost}${config?.data.course_img_fallback}`) ||
      null
    );
  }, [Course_Instance, Technical_Information, config]);

  console.log(thumbnail);
  const handleClick = useCallback(() => {
    // create the context
    const context = {
      actor: {
        first_name: user?.user?.first_name || 'Anonymous',
        last_name: user?.user?.last_name || 'User',
      },
      verb: {
        id: 'https://w3id.org/xapi/tla/verbs/explored',
        display: 'explored',
      },
      object: {
        id: `${window.origin}/course/${result.meta.id}`,
        definitionName: result.Course.CourseTitle,
        description: result.Course.CourseShortDescription,
      },
      resultExtName: 'https://w3id.org/xapi/ecc/result/extensions/CourseId',
      resultExtValue: result.meta.id,
    };

    xAPISendStatement(context);
    router.push(`/course/${result.meta.id}`);
  }, [result, user, router]);

  return (
    <div className='flex flex-row pb-10 border-b border-gray-custom'>
    <div className='flex items-center justify-center'>
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={thumbnail}
            alt=''
            className='w-48 m-2 px-5'
        />
      )}
    </div>
    <div
      className='flex flex-col w-full text-black hover:text-purple-custom hover:text-shadow cursor-pointer pr-2 pl-1 py-1 rounded-md outline-none focus-within:ring-2 focus-within:ring-blue-500'
      title={result.Course.CourseTitle}
    >
      <div className='flex justify-between items-center'>
        <button
          className='text-lg font-semibold group-hover:underline text-left focus:outline-none'
          onClick={handleClick}
        >
          <h3>{result.Course.CourseTitle}</h3>
        </button>
        {user && <SaveModal courseId={result.meta.id} title={result.Course.CourseTitle} />}
      </div>
      <div onClick={handleClick} className='text-left' aria-hidden='true'>
        <div className='flex flex-row py-2 gap-8'>
          <h4>
            <strong>Provider:&nbsp;</strong>
            {result.Course.CourseProviderName}
          </h4>
          <h4>
            <strong>Start Date:&nbsp;</strong>
            {(result.Course_Instance.StartDate).replace(' ', '').split('T')[0]}
          </h4>
        </div>
        
        <p className='line-clamp-4 pr-4 '>
        {/* text-gray-custom */}
          {removeHTML(result.Course.CourseShortDescription)}
        </p>
      </div>
    </div>
    </div>
  );
}
