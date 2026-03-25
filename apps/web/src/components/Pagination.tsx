"use client"

import { useEffect } from "react"

export default function Pagination({
	totalPage = 25,
	pageSize = 10,
	currentPage,
	onChange
}: {
	totalPage?: number;
	pageSize?: number;
	currentPage: number;
	onChange: (page: number) => void;
}) {
	useEffect(() => {
		onChange(currentPage);
		window.scrollTo(0, 0);
	}, [currentPage])

	// 현재 페이지가 속한 그룹의 인덱스 계산 (0부터 시작)
	const currentGroupIndex = Math.floor((currentPage - 1) / pageSize);
	// 해당그룹의 시작과 끝 페이지 계산
	const startPage = currentGroupIndex * pageSize + 1;
	const endPage = Math.min(startPage + pageSize - 1, totalPage);
	const pageToShow = Array.from({ length: endPage - startPage + 1 }, (_e, i) =>
		i + startPage)

	const handlePageClick = (page: number | 'first' | 'last' | 'prev' | 'next') => {
		if (page === 'first') {
			onChange(1);
		}
		else if (page === 'last') {
			onChange(totalPage);
		}
		else if (page === 'prev') {
			onChange(Math.max(1, currentPage - 1));
		}
		else if (page === 'next') {
			onChange(Math.min(totalPage, currentPage + 1));
		}
		else {
			onChange(page);
		}
	}

	const setCurrentPageStyle = (page: number) => {
		return page === currentPage ? 'page' : 'false'
	}

	return (
		<div className="flex flex-col items-center gap-8 mt-40 mb-100">
			<nav className="flex items-center gap-x-8">
				<div className="flex items-center gap-x-8">
					{
						pageToShow.map(page => {
							return (
								<button key={page} type="button" className="btn btn-xs btn-soft btn-square aria-[current='page']:text-white aria-[current='page']:bg-orange" aria-current={setCurrentPageStyle(page)} onClick={() => handlePageClick(page)}>{page}</button>
							)
						})
					}
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