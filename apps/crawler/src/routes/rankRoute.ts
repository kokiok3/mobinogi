import { Request, Response, Router } from 'express';
import { ApiResponse } from '#src/type/responseType';
import { getRankData, setRankData } from '#src/models/rankModel';
import { FetchRankQuery, Rank } from '@mobinogi/shared';
import { getAllServerRank } from '#src/service/rankService';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello from Express on Vercel!' });
});

router.get("/rank", async (req: Request<{}, {}, {}, FetchRankQuery>, res: Response) => {
    const query: FetchRankQuery = req.query;
    const type = query.t;
    try {
        const rankingList = await getRankData(type);
        const response = ApiResponse.success(200, 'good', rankingList);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const errorResponse = ApiResponse.error(500, "Failed to fetch ranking", error.message);
        res.status(500).json(errorResponse);
    }
});

router.post("/rank", async (req: Request<{}, {}, {}, FetchRankQuery>, res: Response) => {
    const query: FetchRankQuery = req.query;
    const type = query.t;
    const rankingList: Rank[] = await getAllServerRank(type);

    setRankData(type, rankingList);
})

export default router;