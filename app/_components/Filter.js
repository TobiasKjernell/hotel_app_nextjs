'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
    const currentParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = currentParams.get('capacity') ?? 'all'

    const handleFilter = (filter) => {
        const params = new URLSearchParams(currentParams);
        params.set('capacity', filter)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return <div className="border border-primary-800 flex">

        <Button filter={'all'} activeFilter={activeFilter} handleFilter={handleFilter}>All cabins</Button>
        <Button filter={'small'} activeFilter={activeFilter} handleFilter={handleFilter}>1&mdash;3 guests</Button>
        <Button filter={'medium'} activeFilter={activeFilter} handleFilter={handleFilter}>4&mdash;7 guests</Button>
        <Button filter={'large'} activeFilter={activeFilter} handleFilter={handleFilter}>8&mdash;12 guests</Button>

    </div>
}   

const Button = ({ filter, handleFilter, activeFilter, children }) => {
    return <button onClick={() => handleFilter(filter)} className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? 'bg-primary-700' : ''}`}>{children}</button>
}

export default Filter;