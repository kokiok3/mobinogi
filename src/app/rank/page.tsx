
import * as cheerio from 'cheerio';
import got from 'got';
import rankStyle from 'styles/rank.module.css'
import Image from 'next/image';


interface Rank {
	rank: string
	server: string
	name: string
	class: string
	power: string
}

const fetchPowerRank = async (): Promise<Rank[]> => {
	try {
		const response = await got('https://mabinogimobile.nexon.com/Ranking/List?t=1', {
			headers: {
				'authority': 'mabinogimobile.nexon.com',
				// 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
				// 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
				'referer': 'https://mabinogimobile.nexon.com/Ranking/List?t=4',
				// 'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
				// 'sec-ch-ua-mobile': '?0',
				// 'sec-ch-ua-platform': '"Windows"',
				// 'sec-fetch-dest': 'document',
				// 'sec-fetch-mode': 'navigate',
				// 'sec-fetch-site': 'same-origin',
				// 'sec-fetch-user': '?1',
				// 'upgrade-insecure-requests': '1',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
			},
			http2: true,
		});

		const $ = cheerio.load(response.body);
		const rankingList: Rank[] = []

		$('li.item').each((_i, el) => {
			const $dl = $(el).find('div > dl');

			rankingList.push({
				rank: $dl.eq(0).find('dt').text().trim(),
				server: $dl.eq(1).find('dd').text().trim(),
				name: $dl.eq(2).find('dd').text().trim(),
				class: $dl.eq(3).find('dd').text().trim(),
				power: $dl.eq(4).find('dd').text().trim().replace(/,/g, ''),
			})
		})

		return rankingList;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

let cachedData: Rank[];
let lastFetchTime: number;
const CACHE_DURATION = 1000 * 60 * 3;
// const CACHE_DURATION = 30 * 60 * 1000;
const getRankingData = async (): Promise<Rank[]> => {
	// console.log('1', cachedData, lastFetchTime)
	const now = Date.now();

	// 캐시가 있고, 30분이 지나지 않았다면 저장된 데이터 반환
	if (cachedData && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
		console.log('캐시된 데이터 반환')
		return cachedData;
	}

	// 캐시가 없거나 만료되었다면 새로 수집
	try {
		cachedData = [
			{
				rank: '1위',
				server: '데이안',
				name: '겅이이이',
				class: '힐러',
				power: '72734'
			},
			{
				rank: '2위',
				server: '데이안',
				name: '아카이유키',
				class: '마법사',
				power: '71070'
			},
			{
				rank: '3위',
				server: '데이안',
				name: '영원핑',
				class: '전사',
				power: '70610'
			},
			{
				rank: '4위',
				server: '데이안',
				name: '크아아아앙',
				class: '힐러',
				power: '69658'
			},
			{
				rank: '5위',
				server: '데이안',
				name: '밤탐',
				class: '악사',
				power: '69473'
			},
			{
				rank: '6위',
				server: '데이안',
				name: '휘말',
				class: '석궁사수',
				power: '69040'
			},
			{
				rank: '7위',
				server: '데이안',
				name: '글자',
				class: '검술사',
				power: '68803'
			},
			{
				rank: '8위',
				server: '데이안',
				name: '지존객',
				class: '검술사',
				power: '68695'
			},
			{
				rank: '9위',
				server: '데이안',
				name: '빌기',
				class: '듀얼블레이드',
				power: '68625'
			},
			{
				rank: '10위',
				server: '데이안',
				name: '쫀득토리',
				class: '음유시인',
				power: '68420'
			},
			{
				rank: '11위',
				server: '데이안',
				name: '광인랑',
				class: '검술사',
				power: '68357'
			},
			{
				rank: '12위',
				server: '데이안',
				name: '빙결카리',
				class: '빙결술사',
				power: '68154'
			},
			{
				rank: '13위',
				server: '데이안',
				name: '앙쓰',
				class: '검술사',
				power: '68002'
			},
			{
				rank: '14위',
				server: '데이안',
				name: '냐냐',
				class: '힐러',
				power: '67919'
			},
			{
				rank: '15위',
				server: '데이안',
				name: '원딜',
				class: '석궁사수',
				power: '67819'
			},
			{
				rank: '16위',
				server: '데이안',
				name: '꿀벌',
				class: '도적',
				power: '67689'
			},
			{
				rank: '17위',
				server: '데이안',
				name: '밤떡',
				class: '장궁병',
				power: '67609'
			},
			{
				rank: '18위',
				server: '데이안',
				name: '김설아',
				class: '화염술사',
				power: '67453'
			},
			{
				rank: '19위',
				server: '데이안',
				name: '침산',
				class: '검술사',
				power: '67436'
			},
			{
				rank: '20위',
				server: '데이안',
				name: '포텐터진누나',
				class: '격투가',
				power: '67249'
			}
		];
		// cachedData = await fetchPowerRank();
		lastFetchTime = now;
		console.log('새로운 데이터 반환', cachedData.length, lastFetchTime)
		return cachedData;

	} catch (error) {
		if (cachedData) {
			return cachedData;
		}
		throw error;
	}
}



export default async function PageRank() {
	// const rankingList = await fetchPowerRank()
	const rankingList = await getRankingData();

	const inputValue = ''

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
						className='absolute left-6 -top-12'
					></Image>
					<span className='ml-40 text-[36px] font-bold'>전투력 랭킹</span>
					<span className='text-[16px] font-medium text-gray-500'>1위부터 1,000위까지 랭킹을 확인하세요.</span>
				</div>
			</div>

			{/* 테이블 헤더 */}
			<div className='flex items-center justify-between mt-60'>
				<span className='text-gray-500 text-[12px]'>게임 내 수치가 변경된 경우, 캐릭터 정보가 랭킹에 반영되기까지 일정 시간이 소요될 수 있습니다.</span>

				<div className="relative">
					<input className="input pe-32 text-[14px]" type="text" placeholder="캐릭터명을 입력하세요." role="combobox" aria-expanded="false" />
					{/* <input className="input ps-8" type="text" placeholder="캐릭터명을 입력하세요." role="combobox" aria-expanded="false" value={inputValue} data-combo-box-input="" onChange={(e) => inputValue} /> */}
					<span className="icon-[tabler--search] text-base-content absolute end-10 top-1/2  shrink-0 -translate-y-1/2" ></span>
				</div>
			</div>

			{/* 테이블 */}
			{/* <div className="mt-16 "> */}
			<div className="mt-16 card border-base-content/10 border">
				{/* <div className="mt-16 border-base-content/25 w-full rounded-lg border shadow-base-300/20 shadow-sm"> */}
				<table className="table table-lg bg-white">
					<thead>
						<tr>
							<th>순위</th>
							<th>서버</th>
							<th>캐릭터명</th>
							<th>클래스</th>
							<th>전투력</th>
						</tr>
					</thead>
					<tbody>
						{rankingList?.map(rank => {
							return (
								<tr key={rank.rank} className="row-hover">
									<td className=' py-42'>{rank.rank}</td>
									<td className=' py-42'>{rank.server}</td>
									<td className=' py-42'>{rank.name}</td>
									<td className=' py-42'>{rank.class}</td>
									<td className=' py-42'>{rank.power}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>

	)
}