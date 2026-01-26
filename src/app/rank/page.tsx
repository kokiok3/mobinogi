import Pagination from 'components/Pagination';
import RankingTable from 'components/RankingTable';
import Search from 'components/Search';
import Image from 'next/image';


export default async function PageRank({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const currentPage = Number((await searchParams).page) || 1;

	return (
		<div className="mt-60 px-200">
			{/* 타이틀 */}
			<div className=''>
				<div className='relative flex flex-col items-center gap-14 w-fit mx-auto'>
					<Image
						src='/sword.gif'
						alt='test'
						width={56}
						height={56}
						objectFit='cover'
						objectPosition='center'
						unoptimized
						className='absolute left-6 -top-12'
					></Image>
					<span className='ml-40 text-[36px] font-bold'>전투력 랭킹</span>
					<span className='text-[16px] font-medium text-gray-500'>1위부터 1,000위까지 랭킹을 확인하세요.</span>
				</div>
			</div>

			{/* 테이블 헤더 */}
			<div className='flex items-center justify-between mt-60'>
				<span className='text-gray-500 text-[12px]'>게임 내 수치가 변경된 경우, 캐릭터 정보가 랭킹에 반영되기까지 일정 시간이 소요될 수 있습니다.</span>

				<Search />
			</div>
			{/* 테이블 헤더 끝 */}

			{/* 테이블 */}
			<RankingTable page={currentPage}></RankingTable>
			{/* 테이블 끝 */}

			{/* 페이지네이션 */}
			<Pagination ></Pagination>
			{/* 페이지네이션 끝 */}
		</div>

	)
}