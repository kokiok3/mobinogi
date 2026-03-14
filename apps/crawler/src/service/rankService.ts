import * as cheerio from 'cheerio';
import { Page } from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Rank, TYPE, SERVER, FetchRank, Type } from '@mobinogi/shared';

puppeteerExtra.use(StealthPlugin())

const extractRankingListFromHtml = (responseBody: any): Rank[] => {
    try {

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
    } catch (error) {
        console.log('extractRankingListFromHtml 에러', error)
        throw error;
    }
}

export const fetchRank = async (page: Page, body: FetchRank): Promise<Rank[]> => {

    try {
        // 1. 먼저 페이지에 접속하여 쿠키 및 세션을 확보
        await page.goto('https://mabinogimobile.nexon.com/Ranking/List/rankdata', {
            waitUntil: 'networkidle2', // 페이지 로딩이 완전히 끝날 때까지 대기
        })

        // 2. 브라우저 내부에서 직접 fetch(AJAX)를 실행합
        // 이 방식은 브라우저의 모든 헤더와 쿠키를 그대로 사용하므로 403을 피할 가능성이 매우 높습니다.
        const result = await page.evaluate(async (body) => {
            const response = await fetch('https://mabinogimobile.nexon.com/Ranking/List/rankdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-requested-with': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    t: body.type,
                    pageno: body.page,
                    s: body.server,
                    c: 0,
                    search: ''
                })
            });
            return await response.text(); // HTML 문자열 반환
        }, body);

        // 3. 받아온 HTML에서 랭킹 리스트 추출
        const rankingList = extractRankingListFromHtml(result);
        return rankingList;

    } catch (error) {
        console.error('fetchRank 에러:', error);
        throw error;
    }
}

const randomTime = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}
const sleep = (ms?: number) => {
    return new Promise<void>(resolve => {
        const time = ms ?? randomTime(500, 13000)

        setTimeout(() => {
            console.log('hi timeout!:', time)
            resolve();
        }, time);
    })
}

const launchBrowser = async () => {
    const browser = await puppeteerExtra.launch({
        headless: 'shell',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    return page;
}
export const getAllServerRank = async (type: Type): Promise<Rank[]> => {
    const serverKeys = Object.keys(SERVER);
    const maxPage = 8;
    let allData: Rank[] = []
    const page = await launchBrowser()

    for (const server of serverKeys) {
        console.log(server)
        let pageIndex
        for (pageIndex = 1; pageIndex <= maxPage; pageIndex++) {

            try {
                console.log('pageIndex: ', pageIndex)
                const body = {
                    type: type,
                    server: SERVER[server as keyof typeof SERVER],
                    page: pageIndex
                }

                const response = await fetchRank(page, body);
                allData = [...allData, ...response];

                // 429 방지를 위한 매 요청 사이 짧은 휴식
                await sleep()

            } catch (error: any) {
                await page.close();

                if (error.response?.statusCode === 429) {
                    console.error(`getAllServerRank 에러: 429: (${server}, ${pageIndex}):`);
                    throw error;
                } else {
                    console.error(`getAllServerRank 에러: (${server}, ${pageIndex}):`);
                    throw error;
                }
            }
        }

        // 서버 한 개 끝날 때마다 휴식
        await sleep(2000);
    }

    await page.close();

    return sortRankByPower(allData);
}

const sortRankByPower = (rankingList: Rank[]) => {
    const descendingList = rankingList.sort((a, b) => +(b.power) - +(a.power));
    return descendingList;
}

export const getRankingType = (type: Type) => {
    let getKey;
    switch (type) {
        case TYPE.power: getKey = 'rankingPower';
            break;
        case TYPE.charm: getKey = 'rankingCharm';
            break;
        case TYPE.living: getKey = 'rankingLiving';
            break;
        case TYPE.mix: getKey = 'rankingMix';
            break;
        default: getKey = 'rankingPower';
    }

    return getKey;
}
