import * as cheerio from 'cheerio';
import Pagination from 'components/Pagination';
import got from 'got';
import { CookieJar } from 'tough-cookie'
import puppeteer from 'puppeteer';
import Image from 'next/image';

interface Rank {
	rank: string
	server: string
	name: string
	class: string
	power: string
}

const Type = {
	power: 1,
	charm: 2,
	living: 3,
	mix: 4
} as const;

const Server = {
	dayan: 1,
	ira: 2,
	duncan: 3,
	alisa: 4,
	maven: 5,
	lasa: 6,
	calix: 7
} as const;

const Class = {
	all: 0
} as const;

interface FetchRank {
	type: (typeof Type)[keyof typeof Type],
	server: (typeof Server)[keyof typeof Server],
	page: number,
	search?: string
}
const sleep = (ms?: number) => {
	return new Promise<void>(resolve => {
		const max = 1000;
		const min = 500
		const time = ms ?? Math.floor(Math.random() * (max - min) + min);

		setTimeout(() => {
			console.log('hi timeout!:', time)
			resolve();
		}, time);
	})
}
const getAllServerRank = async () => {
	const serverKeys = ['ira'];
	// const serverKeys = Object.keys(Server);
	const page = 1;
	let allData: Rank[] = []

	console.log('serverKeys: ', serverKeys)
	for (const server of serverKeys) {
		console.log(server)
		for (let pageIndex = 1; pageIndex <= page; pageIndex++) {

			try {
				console.log('pageIndex: ', pageIndex)
				const body = {
					type: Type.power,
					server: Server[server as keyof typeof Server],
					page: pageIndex
				}
				const response = await fetchRank(body);
				// console.log(response)
				allData = [...allData, ...response];

				// 429 방지를 위한 매 요청 사이 짧은 휴식
				await sleep()

			} catch (error: any) {
				if (error.response?.statusCode === 429) {
					console.error('차단 감지! 1분간 중단합니다.');
					await sleep(60000); // 1분 대기 후 다음 시도
					pageIndex--; // 현재 페이지 다시 시도
				} else {
					console.error(`에러 발생 (${server}, ${page}):`, error.message);
				}
			}
		}

		// 서버 한 개 끝날 때마다 조금 더 긴 휴식
		await sleep(2000);
	}
	return allData;
}

const warmUpCookies = async () => {
	/* mabinogimobile api 요청 시 쿠키값을 포함해야 한다. 안그러면 리다이렉트된 결과값을 받음.
	set-cookie 이외로 생성되는 쿠키값이 필요하여 모든 쿠키를 수집해야 한다. 
	그리고 api에서 필요로 하는 쿠키값들의 도메인을 살펴보니 특정 도메인만 필요로 하는 것 같아 필터링해주었다.
	*/

	const browser = await puppeteer.launch({ headless: 'shell' });
	const page = await browser.newPage();
	await page.goto('https://mabinogimobile.nexon.com')

	// 모든 쿠키 가져오기 (JS가 생성한 것 포함)
	const cookies = await browser.cookies();
	const jar = new CookieJar();

	for (const cookie of cookies) {
		if (cookie.domain === '.nexon.com' || cookie.domain === '.mabinogimobile.nexon.com') {
			const cookieString = `${cookie.name}=${cookie.value}; Domain=${cookie.domain}; Path=${cookie.path};`
			await jar.setCookie(cookieString, 'https://mabinogimobile.nexon.com/');
		}
	}
	await browser.close();
	return jar;
}
const getRankingListFromHtml = (responseBody: any): Rank[] => {

	const $ = cheerio.load(responseBody);
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

	console.log(rankingList)
	return rankingList
}
const fetchRank = async (body: FetchRank): Promise<Rank[]> => {
	// console.log('body: ', body);

	// 쿠키 수집
	const cookieJar = await warmUpCookies();

	// 공통 옵션 설정
	const client = got.extend({ cookieJar })

	// api 호출
	const response = await client.post('https://mabinogimobile.nexon.com/Ranking/List/rankdata', {
		// const response = await got.post('https://mabinogimobile.nexon.com/Ranking/List?t=1', {
		json: {
			t: body.type,
			pageno: body.page,
			s: body.server,
			c: 0,
			search: ''
		},
		hooks: {
			beforeRequest: [
				options => {
					console.log('--- 실제 전송되는 데이터 ---');
					console.log('Body:', options.body);
				}
			]
		},
		// cache: false, // 캐시 사용 안 함
		headers: {
			'authority': 'mabinogimobile.nexon.com', 'x-requested-with': 'XMLHttpRequest',
			// 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
			// 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
			'referer': 'https://mabinogimobile.nexon.com/Ranking/List?t=1',
			// 'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
			// 'sec-ch-ua-mobile': '?0',
			// 'sec-ch-ua-platform': '"Windows"',
			// 'sec-fetch-dest': 'document',
			// 'sec-fetch-mode': 'navigate',
			// 'sec-fetch-site': 'same-origin',
			// 'sec-fetch-user': '?1',
			// 'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
			// 'cookie': '_mlcs=MLCP.1.1767623607105.6; PCID=17676236077445177608219; _ga=GA1.3.492297027.1767623608; _atrk_siteuid=T37TsltVdKc7NWQt; appier_utmz=%7B%22csr%22%3A%22mabinogimobile.nexon.com%22%2C%22timestamp%22%3A1767623609%2C%22lcsr%22%3A%22mabinogimobile.nexon.com%22%7D; _mlcp=MLCP.1.1764240601969.680225652; tk_key=eyJhdWlkIjoiYjMzODFjMzIzMTFmNjY2YzdmNTM2YWQzMTkzYTFlMGM4ZmI0MDZkIiwiaXAiOiIxODMuOTYuMTEwLjExMy43NzE3NyJ9; _hjSessionUser_1327448=eyJpZCI6ImE2MWM0ZTNmLTE4YmMtNWY3ZC1hMzNiLTg0NmM1YTIzNzU0ZSIsImNyZWF0ZWQiOjE3Njc2MjM2MDk4OTQsImV4aXN0aW5nIjp0cnVlfQ==; _mlup_v2=W3sicGl4ZWxJZCI6Im54dC1WVXczaVNxTiIsInV0bVBhcmFtcyI6eyJ1dG1fc291cmNlIjoibmV4b24iLCJ1dG1fbWVkaXVtIjoiaG9tZWJhbm5lciIsInV0bV9jYW1wYWlnbiI6IjEyMDRfbnBheSIsInV0bV9jb250ZW50IjoiaG9tZWJhbm5lcl9uX25wYXltYWluX3BjIn0sImNyZWF0aW9uVGltZSI6IjE3NjgzOTQ4NDk1MzAifV0=; _wp_uid=1-de70d5a7a311cf4265a74c8a43f09433-s1640151283.306000|windows_10|chrome-1vb5cx; mmenc=; mmcreators=; _cfuvid=ARTKJWktg2iWInldyHmMua9WiLQLMJ3j89DRkxu.5DQ-1769001510.7613266-1.0.1.1-pMrkIJ2Kb0QHqzQ0PcoF_UdYew_tQUL9qVyCcVmuOt4; _iflocale=ko-KR; _ifplatform=krpc; isCafe=false; appier_random_unique_id_ViewLanding_7bc7=HItIYZmduzSGtzDlqzBZgz; _gid=GA1.2.1221283240.1769001516; _ifplatform_selector=krpc; A2SK=act:17690061666053580755; _hjSession_1327448=eyJpZCI6IjhiMGIzMTMwLTg3NDUtNDFkZC04M2FiLWQyNDAxN2VhMTYwMyIsImMiOjE3NjkwMDYxNjcxNzIsInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; appier_page_isView_PageView_e482=3100798a40ee18ee3a42f8cae954a08a99ed8c8bd1016e68cbf24506265d5b4d; appier_pv_counterViewTwoPages_34cf=0; appier_page_isView_ViewTwoPages_34cf=3100798a40ee18ee3a42f8cae954a08a99ed8c8bd1016e68cbf24506265d5b4d; mmtoken=wRH9xHdXLEIvMsk2wthaz1z2N5t946F8YNsAPH8YpTi8-Zj2pezDUfCsO_Z3nI1MOq4uB_hXcqddQPAwJGyDPfP2mdZoa1rMjZrMgI3XxLc1:4aCK0d2eAKbyZvMdKljMzuYlgYa3Upno2NGQ9DNk6eY9JaorAw3_x0xBHKG6dqZreRrzHSl0AVLFwuK1aFLqTlDQEDcwhNgwaWrzs9S-9Mo1; __cf_bm=3G3cTL73TbNOtYF_B199JL52_bZl9b5kT7CQ0hPZOzQ-1769008851.7191799-1.0.1.1-U2YT63FZrLL7GBnVW3nZ.8nEprowcS2WTCaSedbZZqB2B_6HKGwjkuDGOsJ95_6jn6pD8vbxOUBV.uOBD4m3AsfRIjTwZzKsv1b4akdW5s15aAdm1R4GUklvQoE8vsrl; _atrk_ssid=NQ5sJmBfytaluQdCrXo2F3; _ga_8R8GW9WJK8=GS2.3.s1769008855$o35$g1$t1769008856$j59$l0$h0; _gcl_au=1.3.250775469.1767623608.1587909721.1769008857.1769008856; appier_pv_counterPageView_e482=3; _ga_XXRXJ82MRH=GS2.3.s1769008855$o35$g1$t1769008856$j59$l0$h0; t_se_id=0bcc7146-4bf7-48aa-aad2-3b117a5426da; t_u_so=google; t_u_me=organic; _atrk_sessidx=5; gnbLogo=null; _mlss=W3sicGl4ZWxJZCI6Im54dC1WVXczaVNxTiIsInNlc3Npb25JZCI6IjE3NjkwMDg4NTczMzZfN2ViMzkyYjI1MWRkNGFjZSIsInNlc3Npb25TdGFydFRpbWVzdGFtcCI6MTc2OTAwODg1NzMzNiwic2Vzc2lvbkxhc3RBY3RpdmVUaW1lc3RhbXAiOjE3NjkwMDg4NTczMzZ9XQ==; _mlss=W3sicGl4ZWxJZCI6Im54dC1WVXczaVNxTiIsInNlc3Npb25JZCI6IjE3NjkwMDg4NTczMzZfN2ViMzkyYjI1MWRkNGFjZSIsInNlc3Npb25TdGFydFRpbWVzdGFtcCI6MTc2OTAwODg1NzMzNiwic2Vzc2lvbkxhc3RBY3RpdmVUaW1lc3RhbXAiOjE3NjkwMDg4NTczMzZ9XQ==; _mlss=W3sicGl4ZWxJZCI6Im54dC1WVXczaVNxTiIsInNlc3Npb25JZCI6IjE3NjkwMDg4NTczMzZfN2ViMzkyYjI1MWRkNGFjZSIsInNlc3Npb25TdGFydFRpbWVzdGFtcCI6MTc2OTAwODg1NzMzNiwic2Vzc2lvbkxhc3RBY3RpdmVUaW1lc3RhbXAiOjE3NjkwMDg4NTczMzZ9XQ==; cto_bundle=7d9eCl85JTJCRkNqSCUyQks3RFJ3V1hnelpydnVCTGFYNzlaczRVJTJCWE5nY1k3Wk1JamR1V205JTJCTjRvd2xhNGR5WVduMmllNFR5bXVNenVmVElPOHNTMXRzSTl0TjJBTGhrTnBLSE5raGsyeFBRRE8xNFM0b0FGVm9Ia0F0NVpyMmNvNjJlVE9sNlZxU0UlMkJ0ZzlLR0VscVVVOTRSOWV3JTNEJTNE; _gat_UA-116900215-1=1; _gat_UA-136873854-1=1; _ga=GA1.1.492297027.1767623608; _ga_G8E41RL4PQ=GS2.1.s1769008855$o36$g1$t1769008857$j58$l0$h0; _ga_0M230TCW98=GS1.1.1769008855.22.1.1769008858.0.0.0',
			// 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		http2: true,
	});
	console.log('실제 나간 요청 헤더:', response.request.options.headers.cookie);
	// console.log(response.body)

	const rankingList = getRankingListFromHtml(response.body)
	return rankingList;
}

let cachedData: Rank[];
let lastFetchTime: number;
const CACHE_DURATION = 1000 * 60 * 3;
// const CACHE_DURATION = 30 * 60 * 1000;
const getCachedRankingData = async (): Promise<Rank[]> => {

	// const matchingCookies = await cookieJar.getCookies('https://mabinogimobile.nexon.com/')
	// console.log('matchingCookies: ', matchingCookies)

	// const res = await got('https://mabinogimobile.nexon.com/');
	// console.log('res: ', res);
	// const cookies = headers['set-cookie'] || [];
	// console.log(cookies); // Array of cookie strings

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

		cachedData = await getAllServerRank();
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
	const rankingList = await getCachedRankingData();

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

				<div className="relative">
					<input className="input pe-32 text-[14px]" type="text" placeholder="캐릭터명을 입력하세요." role="combobox" aria-expanded="false" />
					{/* <input className="input ps-8" type="text" placeholder="캐릭터명을 입력하세요." role="combobox" aria-expanded="false" value={inputValue} data-combo-box-input="" onChange={(e) => inputValue} /> */}
					<span className="icon-[tabler--search] text-base-content absolute end-10 top-1/2  shrink-0 -translate-y-1/2" ></span>
				</div>
			</div>
			{/* 테이블 헤더 끝 */}

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
			{/* 테이블 끝 */}

			{/* 페이지네이션 */}
			<Pagination></Pagination>
			{/* 페이지네이션 끝 */}
		</div>

	)
}