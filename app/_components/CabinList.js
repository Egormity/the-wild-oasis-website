import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '@/app/_lib/data-service';

export default async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (cabins.length === 0) return null;

  let displayedCabins = cabins;
  // if (filter==='all') displayedCabins = cabins
  if (filter === 'small') displayedCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);
  if (filter === 'medium')
    displayedCabins = cabins.filter(cabin => cabin.maxCapacity > 3 && cabin.maxCapacity < 8);
  if (filter === 'large') displayedCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);

  return (
    <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14'>
      {displayedCabins.map(cabin => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
