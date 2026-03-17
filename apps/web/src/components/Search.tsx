"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const sFromUrl = useMemo(() => searchParams.get('s') ?? '', [searchParams]);
    const [search, setSearch] = useState(sFromUrl);

    useEffect(() => {
        setSearch(sFromUrl);
    }, [sFromUrl]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const applySearchToUrl = () => {
        const params = new URLSearchParams(searchParams);
        const trimmed = search.trim();

        if (trimmed) params.set('s', trimmed);
        else params.delete('s');

        // 검색하면 1페이지부터
        params.set('page', '1');

        router.push(`?${params.toString()}`);
    }

    return (
        <div className="relative">
            <input
                className="input pe-32 text-[14px] focus:border-inherit focus:outline-none"
                type="text"
                placeholder="캐릭터명을 입력하세요."
                role="combobox"
                aria-expanded="false"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') applySearchToUrl();
                }}
            />
            <button
                type="button"
                aria-label="검색"
                className="absolute end-10 top-1/2 shrink-0 -translate-y-1/2"
                onClick={applySearchToUrl}
            >
                <span className="icon-[tabler--search] text-base-content"></span>
            </button>
        </div>
    )
}