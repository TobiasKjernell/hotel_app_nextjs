import CabinCard from '@/app/_components/CabinCard'
import { getCabins } from '../_lib/data-service';
// import { unstable_noStore } from 'next/cache';

const CabinList = async ({ filter }) => {
    // unstable_noStore(); 
    const cabins = await getCabins();
    if (!cabins.length) return null;

    let displayCabins;
    if(filter === 'all') displayCabins = cabins;
    if(filter === 'small') displayCabins = cabins.filter(item => item.maxCapacity <= 3)
    if(filter === 'medium') displayCabins = cabins.filter(item => item.maxCapacity >= 4 && item.maxCapacity <= 7)
    if(filter === 'large') displayCabins = cabins.filter(item => item.maxCapacity >= 8) 
 
    return (
        <>
            {cabins && cabins.length > 0 && (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
                    {displayCabins.map((cabin) => (
                        <CabinCard cabin={cabin} key={cabin.id} />
                    ))}
                </div>
            )}  
        </>
    )
}

export default CabinList;