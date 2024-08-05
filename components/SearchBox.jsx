'use client'

import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {useIsClient} from '@/lib/hooks';

const reviews = [
    { slug: 'celeste-2', title: 'Celeste 2 update 1' },
    { slug: 'subnautica-2', title: 'Subnautica 2 update 1' },
    { slug: 'hades-2018', title: 'Hades' },
    { slug: 'fall-guys', title: 'Fall Guys: Ultimate Knockout' },
    { slug: 'black-mesa', title: 'Black Mesa' },
    { slug: 'disco-elysium', title: 'Disco Elysium' }
];

export default function SearchBox(){
    const router = useRouter();
    const isClient = useIsClient();
    const [ query, setQuery ] = useState('');

    const handleChange = (review) => {
        console.log('selected: ', review);
        router.push(`/reviews/${review.slug}`);
    };

    console.log('[SearchBox] query: ', query);

    if(!isClient){
        return null;
    }

    const filtered = reviews.filter((review) => review.title.includes(query));

    return (
        <div className="relativ w-48">
            <Combobox onChange={handleChange}>
            {/* <ComboboxInput placeholder="Search…" /> */}
            <Combobox.Input 
                className="border px-2 py-1 rounded w-full"
                onChange={(event)=> setQuery(event.target.value)}
                placeholder="Search…" 
                value={query}
            />
            <Combobox.Options className="absolute bg-white py-1 w-full">
                {filtered.map((review)=>(
                    <Combobox.Option key={review.slug} value={review}>
                        {({active})=>(
                            <span className={`block px-2 truncate w-full ${
                                active ? 'bg-orange-100' : ''
                            }`}>
                            {review.title}
                        </span>
                        )}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
        </div>
    );
}