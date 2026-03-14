import { Rank, TYPE, TYPE_KOREAN } from '@mobinogi/shared';
import cron from 'node-cron';
import { getAllServerRank } from '#src/service/rankService';
import { setRankData } from '#src/models/rankModel';

// cron 
// 초(선택) 분 시 일 달 주
export const cronRanking = () => {
    cron.schedule('0 * * * *', async () => {
        try {

            const powerList: Rank[] = await getAllServerRank(TYPE.power);
            setRankData(TYPE.power, powerList);

        } catch (error) {
            console.log('crontab Error:', error)
        }
    }, { timezone: 'Asia/Seoul' });

    cron.schedule('0 * * * *', async () => {
        try {
            const charmList: Rank[] = await getAllServerRank(TYPE.charm);
            setRankData(TYPE.charm, charmList);

        } catch (error) {
            console.log('crontab Error:', error)
        }
    }, { timezone: 'Asia/Seoul' });

    cron.schedule('0 * * * *', async () => {
        try {
            const livingList: Rank[] = await getAllServerRank(TYPE.living);
            setRankData(TYPE.living, livingList);

        } catch (error) {
            console.log('crontab Error:', error)
        }
    }, { timezone: 'Asia/Seoul' });
}