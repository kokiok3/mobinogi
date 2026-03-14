import { Rank, TYPE, TYPE_KOREAN } from '@mobinogi/shared';
import cron from 'node-cron';
import { getAllServerRank } from '#src/service/rankService';
import { setRankData } from '#src/models/rankModel';

// cron 
// 초(선택) 분 시 일 달 주
export const cronRanking = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            // 모든 타입 반복
            for (const [keys, value] of Object.entries(TYPE)) {
                if (value === TYPE.mix) return;

                console.time()
                const rankingList: Rank[] = await getAllServerRank(value);

                console.log(TYPE_KOREAN[value])
                console.timeEnd()

                setRankData(value, rankingList);
            }

        } catch (error) {
            console.log('crontab Error:', error)
        }
    }, { timezone: 'Asia/Seoul' });
}