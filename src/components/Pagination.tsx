"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Pagination() {
	const [currentPage, setPage] = useState(1);
	useEffect(() => { handleRouter() }, [currentPage])

	const router = useRouter();
	const searchParams = useSearchParams();
	const handleRouter = () => {
		const params = new URLSearchParams(searchParams);
		params.set('page', currentPage.toString());
		router.push(`?${params.toString()}`)
	}

	const handlePageClick = (page: number | 'first' | 'last' | 'prev' | 'next') => {
		if (page === 'first') {
			setPage(1);
		}
		else if (page === 'last') {
			setPage(50);
		}
		else if (page === 'prev') {
			setPage(currentPage - 1);
		}
		else if (page === 'next') {
			setPage(currentPage + 1);
		}
		else {
			setPage(page);
		}
	}


	const getCurrentPage = (page: number) => {
		return page === currentPage ? 'page' : 'false'
	}

	return (
		<div className="flex flex-col items-center gap-8 mt-40 mb-100">
			<nav className="flex items-center gap-x-8">
				<div className="flex items-center gap-x-8">
					{Array.from({ length: 10 }, (_e, i) => {
						return (
							<button key={i} type="button" className="btn btn-xs btn-soft btn-square aria-[current='page']:text-white aria-[current='page']:bg-orange" aria-current={getCurrentPage(i + 1)} onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
							// <button type="button" className="btn btn-soft btn-square aria-[current='page']:text-bg-soft-primary" aria-current="page">2</button>
						)
					})}
				</div>
			</nav>

			<nav className="flex items-center gap-x-8">
				<button type="button" className="btn btn-sm btn-soft btn-square" aria-label="First Page Button" onClick={() => handlePageClick('first')}>
					<span className="icon-[tabler--chevrons-left] rtl:rotate-180"></span>
				</button>
				<button type="button" className="btn btn-sm btn-soft btn-square" aria-label="Previous Button" onClick={() => handlePageClick('prev')}>
					<span className="icon-[tabler--chevron-left] rtl:rotate-180"></span>
				</button>
				<button type="button" className="btn btn-sm btn-soft btn-square" aria-label="Next Button" onClick={() => handlePageClick('next')}>
					<span className="icon-[tabler--chevron-right] rtl:rotate-180"></span>
				</button>
				<button type="button" className="btn btn-sm btn-soft btn-square" aria-label="Last Page Button" onClick={() => handlePageClick('last')}>
					<span className="icon-[tabler--chevrons-right] rtl:rotate-180"></span>
				</button>
			</nav>
		</div>
	)
}