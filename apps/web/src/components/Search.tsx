"use client"
import { useState } from 'react';

export default function Search({
    onChange
}: {
    onChange: (keyword: string) => void;

}) {

    const [search, setSearch] = useState('');

    return (
        <div className="relative">
            <input
                className="input pe-32 text-[14px] focus:border-inherit focus:outline-none"
                type="text"
                placeholder="캐릭터명을 입력하세요."
                role="combobox"
                aria-expanded="false"
                value={search}
                onChange={(e) => setSearch(e.target.value.trim())}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onChange(search);
                }}
            />
            <button
                type="button"
                aria-label="검색"
                className="absolute end-10 top-1/2 shrink-0 -translate-y-1/2"
                onClick={() => onChange(search)}
            >
                <span className="icon-[tabler--search] text-base-content"></span>
            </button>
        </div>
    )
}