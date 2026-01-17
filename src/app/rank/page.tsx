import * as cheerio from 'cheerio';
import got from 'got';
import rankStyle from 'styles/rank.module.css'

interface Rank {
	rank: string
	server: string
	name: string
	class: string
	power: string
}

const fetchPowerRank = async () => {
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
	}
}

export default async function PageRank() {
	const rankingList = await fetchPowerRank()
	// console.log(rankingList)

	return (
		<div>
			{rankingList?.map(rank => {
				return <div className={rankStyle.test} key={rank.rank}>
					<div>
						<span>순위</span>
						<span>{rank.rank}</span>
					</div>
					<div>
						<span>서버</span>
						<span>{rank.server}</span>
					</div>
					<div>
						<span>캐릭터명</span>
						<span>{rank.name}</span>
					</div>
					<div>
						<span>클래스</span>
						<span>{rank.class}</span>
					</div>
					<div>
						<span>전투력</span>
						<span>{rank.power}</span>
					</div>
				</div>
			})}
		</div>

	)
}