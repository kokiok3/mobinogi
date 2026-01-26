"use client"
import { useState } from 'react';

export default function Search() {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="relative">
            <input className="input pe-32 text-[14px]" type="text" placeholder="캐릭터명을 입력하세요." role="combobox" aria-expanded="false" value={search} onChange={handleSearchChange} />
            <span className="icon-[tabler--search] text-base-content absolute end-10 top-1/2  shrink-0 -translate-y-1/2" ></span>
        </div>
    )
}