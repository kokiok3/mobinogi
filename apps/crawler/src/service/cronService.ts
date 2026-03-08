import { Rank } from '@mobinogi/shared';
import cron from 'node-cron';
import { getAllServerRank } from '#src/service/rankService';
import { setRankData } from '#src/models/rankModel';

// cron 
// 초(선택) 분 시 일 달 주
export const cronRanking = () => {
    // cron.schedule('*/3 * * * * *', async () => {
    cron.schedule('* * * * *', async () => {

        try {
            console.log('running a task every minute');

            // const rankingList: Rank[] = await getAllServerRank();
            // console.log('crontab:', rankingList)

            // setRankData(rankingList);
        } catch (error) {

        }
    }, { timezone: 'Asia/Seoul' });
}