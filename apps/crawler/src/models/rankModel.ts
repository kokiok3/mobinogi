import { redisClient } from '#src/redis.ts';
import { Rank } from '@mobinogi/shared';

export const getRankData = async (): Promise<Rank[]> => {
    const rankingPower: string | null = await redisClient.get('rankingPower');
    const rankingPowerList = rankingPower ? JSON.parse(rankingPower) : []

    return rankingPowerList;
}
export const setRankData = async (data: string): Promise<void> => {
    console.log('setRankingData')
    // const data = [
    //     {
    //         rank: '1위',
    //         server: '데이안',
    //         name: '겅이이이',
    //         class: '힐러',
    //         power: '74758'
    //     },
    //     {
    //         rank: '1위',
    //         server: '아이라',
    //         name: '뿌건',
    //         class: '힐러',
    //         power: '74425'
    //     },
    //     {
    //         rank: '2위',
    //         server: '데이안',
    //         name: '아카이유키',
    //         class: '마법사',
    //         power: '73003'
    //     },
    //     {
    //         rank: '3위',
    //         server: '데이안',
    //         name: '영원핑',
    //         class: '전사',
    //         power: '72900'
    //     },
    //     {
    //         rank: '4위',
    //         server: '데이안',
    //         name: '글자',
    //         class: '검술사',
    //         power: '72249'
    //     },
    //     {
    //         rank: '5위',
    //         server: '데이안',
    //         name: '여기사',
    //         class: '대검전사',
    //         power: '71510'
    //     },
    //     {
    //         rank: '6위',
    //         server: '데이안',
    //         name: '빌기',
    //         class: '듀얼블레이드',
    //         power: '71393'
    //     },
    //     {
    //         rank: '7위',
    //         server: '데이안',
    //         name: '지존객',
    //         class: '검술사',
    //         power: '71379'
    //     },
    //     {
    //         rank: '8위',
    //         server: '데이안',
    //         name: '크아아아앙',
    //         class: '힐러',
    //         power: '71307'
    //     },
    //     {
    //         rank: '2위',
    //         server: '아이라',
    //         name: '김모그',
    //         class: '힐러',
    //         power: '71250'
    //     },
    //     {
    //         rank: '3위',
    //         server: '아이라',
    //         name: '제로',
    //         class: '전격술사',
    //         power: '71199'
    //     },
    //     {
    //         rank: '4위',
    //         server: '아이라',
    //         name: '별꼬리',
    //         class: '전사',
    //         power: '71163'
    //     },
    //     {
    //         rank: '9위',
    //         server: '데이안',
    //         name: '휘말',
    //         class: '석궁사수',
    //         power: '71029'
    //     },
    //     {
    //         rank: '10위',
    //         server: '데이안',
    //         name: '앙쓰',
    //         class: '검술사',
    //         power: '71009'
    //     },
    //     {
    //         rank: '11위',
    //         server: '데이안',
    //         name: '쫀득토리',
    //         class: '음유시인',
    //         power: '70408'
    //     },
    //     {
    //         rank: '12위',
    //         server: '데이안',
    //         name: '밤떡',
    //         class: '장궁병',
    //         power: '70286'
    //     },
    //     {
    //         rank: '5위',
    //         server: '아이라',
    //         name: '채똘빡',
    //         class: '전사',
    //         power: '70259'
    //     },
    //     {
    //         rank: '13위',
    //         server: '데이안',
    //         name: '원딜',
    //         class: '석궁사수',
    //         power: '70251'
    //     },
    //     {
    //         rank: '14위',
    //         server: '데이안',
    //         name: '냐냐',
    //         class: '힐러',
    //         power: '70155'
    //     },
    //     {
    //         rank: '15위',
    //         server: '데이안',
    //         name: '밤탐',
    //         class: '악사',
    //         power: '70146'
    //     },
    //     {
    //         rank: '6위',
    //         server: '아이라',
    //         name: '누야',
    //         class: '전사',
    //         power: '70139'
    //     },
    //     {
    //         rank: '7위',
    //         server: '아이라',
    //         name: '쏭쏭쏭',
    //         class: '수도사',
    //         power: '70115'
    //     },
    //     {
    //         rank: '8위',
    //         server: '아이라',
    //         name: '히디먕',
    //         class: '장궁병',
    //         power: '70074'
    //     },
    //     {
    //         rank: '16위',
    //         server: '데이안',
    //         name: 'WinterFlower',
    //         class: '검술사',
    //         power: '70070'
    //     },
    //     {
    //         rank: '17위',
    //         server: '데이안',
    //         name: '겅이이이2',
    //         class: '빙결술사',
    //         power: '70068'
    //     },
    //     {
    //         rank: '9위',
    //         server: '아이라',
    //         name: '정읏봉',
    //         class: '사제',
    //         power: '70064'
    //     },
    //     {
    //         rank: '10위',
    //         server: '아이라',
    //         name: '프란츠',
    //         class: '수도사',
    //         power: '70064'
    //     },
    //     {
    //         rank: '18위',
    //         server: '데이안',
    //         name: '모캬',
    //         class: '화염술사',
    //         power: '70048'
    //     },
    //     {
    //         rank: '19위',
    //         server: '데이안',
    //         name: '꿀벌',
    //         class: '도적',
    //         power: '70022'
    //     },
    //     {
    //         rank: '11위',
    //         server: '아이라',
    //         name: '분홍털고양이',
    //         class: '석궁사수',
    //         power: '69874'
    //     },
    //     {
    //         rank: '12위',
    //         server: '아이라',
    //         name: 'ISTP',
    //         class: '빙결술사',
    //         power: '69810'
    //     },
    //     {
    //         rank: '13위',
    //         server: '아이라',
    //         name: '하유현',
    //         class: '검술사',
    //         power: '69763'
    //     },
    //     {
    //         rank: '14위',
    //         server: '아이라',
    //         name: '가델',
    //         class: '대검전사',
    //         power: '69698'
    //     },
    //     {
    //         rank: '15위',
    //         server: '아이라',
    //         name: 'LP',
    //         class: '화염술사',
    //         power: '69694'
    //     },
    //     {
    //         rank: '20위',
    //         server: '데이안',
    //         name: '은딘',
    //         class: '악사',
    //         power: '69574'
    //     },
    //     {
    //         rank: '16위',
    //         server: '아이라',
    //         name: '띰무',
    //         class: '검술사',
    //         power: '69566'
    //     },
    //     {
    //         rank: '17위',
    //         server: '아이라',
    //         name: '코노',
    //         class: '사제',
    //         power: '69530'
    //     },
    //     {
    //         rank: '18위',
    //         server: '아이라',
    //         name: '장군',
    //         class: '힐러',
    //         power: '69463'
    //     },
    //     {
    //         rank: '19위',
    //         server: '아이라',
    //         name: '비트주세욧',
    //         class: '장궁병',
    //         power: '69352'
    //     },
    //     {
    //         rank: '20위',
    //         server: '아이라',
    //         name: '이프로',
    //         class: '장궁병',
    //         power: '69285'
    //     }
    // ]
    let bool = await redisClient.set('rankingPower', JSON.stringify(data));
    console.log('bool: ', bool)
}
