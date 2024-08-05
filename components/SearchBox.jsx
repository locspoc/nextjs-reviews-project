'use client'

import { Combobox } from '@headlessui/react';
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

    const isClient = useIsClient();

    // console.log('[SearchBox] isClient: ', isClient);

    if(!isClient){
        return null;
    }

    return (
        <div className="relativ w-48">
            <Combobox>
            {/* <ComboboxInput placeholder="Search…" /> */}
            <Combobox.Input placeholder="Search…" className="border px-2 py-1 rounded w-full"/>
            <Combobox.Options className="absolute bg-white py-1 w-full">
                {reviews.map((review)=>(
                    <Combobox.Option key={review.slug}>
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