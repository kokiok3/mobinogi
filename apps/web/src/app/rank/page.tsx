import { TYPE, Type, TYPE_KOREAN, TypeKorean } from '@mobinogi/shared';
import Pagination from '@/components/Pagination';
import RankingTable from '@/components/RankingTable';
import Search from '@/components/Search';
import Image from 'next/image';
import Sword from "@/assets/images/sword.gif"
import Crown from "@/assets/images/crown.gif"
import Fish from "@/assets/images/fish.gif"
import Trophy from "@/assets/images/trophy.gif"


export default async function PageRank({ searchParams }: { searchParams: Promise<{ page?: string, t: Type }> }) {

	const params = await searchParams;

	const currentPage = Number(params.page) || 1;
	const currentType = params.t || TYPE.power;

	const typeKorean: TypeKorean = TYPE_KOREAN[currentType]

	return (
		<div className="mt-60 xl:px-200">
			<div className="">
				{/* 배경 */}
				<div className="animate-floating-left fixed left-0 bottom-100 -z-1 w-300 h-300 bra bg-linear-to-r from-yellow-500 to-orange-200 blur-[50px] rounded-full opacity-[0.3]"></div>
				<div className="animate-floating-right fixed -right-150 top-200 -z-1 w-700 h-500 bra bg-linear-to-r from-orange-500 to-orange-50 blur-[70px] rounded-full opacity-[0.3]"></div>

				{/* 타이틀 */}
				<div className=''>
					<div className='relative flex flex-col items-center gap-14 w-fit mx-auto'>
						{currentType === TYPE.power &&
							<Image
								src={Sword}
								alt='검 애니메이션 아이콘'
								width={56}
								height={56}
								objectFit='cover'
								objectPosition='center'
								unoptimized
								className='absolute left-6 -top-12'
								data-source="https://www.flaticon.com/kr/free-animated-icons/"
							></Image>

						}
						{currentType === TYPE.charm &&
							<Image
								src={Crown}
								alt='왕관 애니메이션 아이콘'
								width={56}
								height={56}
								objectFit='cover'
								objectPosition='center'
								unoptimized
								className='absolute left-16 -top-12'
								data-source="https://www.flaticon.com/kr/free-animated-icons/"
							></Image>}
						{currentType === TYPE.living &&
							<Image
								src={Fish}
								alt='물고기 애니메이션 아이콘'
								width={54}
								height={54}
								objectFit='cover'
								objectPosition='center'
								unoptimized
								className='absolute left-22 -top-10'
								data-source="https://www.flaticon.com/kr/free-animated-icons/"
							></Image>}
						{currentType === TYPE.mix &&
							<Image
								src={Trophy}
								alt='트로피 애니메이션 아이콘'
								width={50}
								height={50}
								objectFit='cover'
								objectPosition='center'
								unoptimized
								className='absolute left-19 -top-6'
								data-source="https://www.flaticon.com/kr/free-animated-icons/"
							></Image>}
						<span className='ml-40 text-[36px] font-bold'>{typeKorean} 랭킹</span>
						<span className='text-[16px] font-medium text-gray-500'>1위부터 500위까지 랭킹을 확인하세요.</span>
					</div>
				</div>

				{/* 테이블 헤더 */}
				<div className='rank__header'>
					<span className='text-gray-500 text-[12px]'>
						매 00분에 랭킹 정보가 업데이트 됩니다. 랭킹에 반영되기까지 일정 시간이 소요될 수 있습니다.
					</span>

					<Search />
				</div>
				{/* 테이블 헤더 끝 */}

				{/* 테이블 */}
				<RankingTable page={currentPage} type={currentType}></RankingTable>
				{/* 테이블 끝 */}

				{/* 페이지네이션 */}
				<Pagination type={currentType}></Pagination>
				{/* 페이지네이션 끝 */}
			</div>
		</div>

	)
}