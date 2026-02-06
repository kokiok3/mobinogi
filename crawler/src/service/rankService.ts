import * as cheerio from 'cheerio';
import got from 'got';
import { CookieJar } from 'tough-cookie'
import puppeteer from 'puppeteer';
import { Rank, Type, Server, FetchRank } from '#src/type/rankType.ts';
import cron from 'node-cron';
import { setRankData } from '#src/models/rankModel.ts';



const extractRankingListFromHtml = (responseBody: any): Rank[] => {

    const $ = cheerio.load(responseBody);
    const rankingList: Rank[] = []

    $('li.item').each((_i, el) => {
        const $dl = $(el).find('div > dl');

        rankingList.push({
            // rank: $dl.eq(0).find('dt').text().trim(),
            server: $dl.eq(1).find('dd').text().trim(),
            name: $dl.eq(2).find('dd').text().trim(),
            class: $dl.eq(3).find('dd').text().trim(),
            power: $dl.eq(4).find('dd').text().trim().replace(/,/g, ''),
        })
    })

    return rankingList
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
export const fetchRank = async (body: FetchRank): Promise<Rank[]> => {
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
        // hooks: {
        //     beforeRequest: [
        //         options => {
        //             console.log('--- 실제 전송되는 데이터 ---');
        //             console.log('Body:', options.body);
        //         }
        //     ]
        // },
        // cache: false, // 캐시 사용 안 함
        headers: {
            'authority': 'mabinogimobile.nexon.com', 'x-requested-with': 'XMLHttpRequest',
            'referer': 'https://mabinogimobile.nexon.com/Ranking/List?t=1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
        },
        http2: true,
    });
    // console.log('실제 나간 요청 헤더:', response.request.options.headers.cookie);

    const rankingList = extractRankingListFromHtml(response.body)
    return rankingList;
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
export const getAllServerRank = async (): Promise<Rank[]> => {
    const serverKeys = Object.keys(Server);
    // const page = 8;
    const page = 1;
    let allData: Rank[] = []

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

    return sortRankByPower(allData);
}

const sortRankByPower = (rankingList: Rank[]) => {
    const descendingList = rankingList.sort((a, b) => +(b.power) - +(a.power));
    return descendingList;
}

// cron 
// 초(선택) 분 시 일 달 주
cron.schedule('* * * * *', async () => {
    console.log('running a task every minute');
    const rankingList: Rank[] = await getAllServerRank();
    // console.log('crontab:', rankingList)

    setRankData(JSON.stringify(rankingList));
});