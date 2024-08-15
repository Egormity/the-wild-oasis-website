'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const btnName = ['All cabins', 'less < 4 guests', '4 - 7 guests', 'more > 8 guests'];
const paramNames = ['all', 'small', 'medium', 'large'];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get('capacity') || 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathName}?${params + ''}`, { scroll: false });
  }

  return (
    <div className='grid grid-cols-4 border border-primary-800 duration-200'>
      {btnName.map((btn, i) => (
        <button
          key={btn}
          onClick={() => handleFilter(paramNames[i])}
          className={`${activeFilter === paramNames[i] ? 'bg-primary-800 text-primary-50' : ''} px-5 py-2 hover:bg-primary-700`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}
