'use client'

import { Combobox } from '@headlessui/react';
import {useIsClient} from '@/lib/hooks';

export default function SearchBox(){

    const isClient = useIsClient();

    console.log('[SearchBox] isClient: ', isClient);

    if(!isClient){
        return null;
    }

    return (
        <Combobox>
            {/* <ComboboxInput placeholder="Search…" /> */}
            <Combobox.Input placeholder="Search…" />
        </Combobox>
        
    );
}