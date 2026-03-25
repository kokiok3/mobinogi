'use client';

import { Rank, Type } from "@mobinogi/shared";
import Pagination from '@/components/Pagination';
import RankingTable from '@/components/RankingTable';
import Search from '@/components/Search';
import { useEffect, useState } from "react";

export default function TableContainer({
    list, type
}: {
    list: Rank[];
    type: Type;
}) {
    // 검색어
    const [keyword, setKeyword] = useState('');
    useEffect(() => {
        setPage(1);
    }, [keyword, type])

    // 데이터
    const filteredList = keyword
        ? list.filter((e) => e.name.includes(keyword))
        : list;
    const totalPage = filteredList.length > 0 ? Math.ceil(filteredList.length / 20) : 0;

    // 페이지네이션
    const [page, setPage] = useState(1);

    return (
        <div>
            {/* 테이블 헤더 */}
            <div className='rank__header'>
                <span className='text-gray-500 text-[12px]'>
                    매 00분에 랭킹 정보가 업데이트 됩니다. 랭킹에 반영되기까지 일정 시간이 소요될 수 있습니다.
                </span>
                <Search onChange={setKeyword} />

            </div>
            {/* 테이블 헤더 끝 */}

            {/* 테이블 */}
            < RankingTable list={filteredList} page={page} type={type} ></RankingTable >
            {/* 테이블 끝 */}

            {/* 페이지네이션 */}
            {
                filteredList.length > 0 && (
                    <Pagination totalPage={totalPage} currentPage={page} onChange={setPage} />
                )
            }
            {/* 페이지네이션 끝 */}
        </div>

    )
}