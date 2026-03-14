import { redisClient } from '#src/redis';
import { getRankingType } from '#src/service/rankService';
import { Rank, Type, TYPE } from '@mobinogi/shared';


export const getRankData = async (type: Type): Promise<Rank[]> => {
    try {
        const rankingKey = getRankingType(type);
        const rankingValue: string | null = await redisClient.get(rankingKey);
        const rankingList = rankingValue ? JSON.parse(rankingValue) as Rank[] : []
        return rankingList;

    } catch (error) {
        console.error('Error getting rank data: ', error);
        return [];
    }
}
export const setRankData = async (type: Type, data: Rank[]): Promise<void> => {
    try {
        const rankingKey = getRankingType(type);
        const result = await redisClient.set(rankingKey, JSON.stringify(data));
        console.log('setRankingResult: ', rankingKey, result)

    } catch (error) {
        console.error('Error setting rank data: ', error);
    }
}
