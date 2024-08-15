import SideNavigation from '@/app/_components/SideNavigation';

export default function layout({ children }) {
  return (
    <div className='grid h-full grid-cols-[16rem_1fr] gap-12'>
      <div>
        <SideNavigation />
      </div>
      <div className='py-1'>{children}</div>
    </div>
  );
}
