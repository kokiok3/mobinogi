import { Router } from 'express';
import { ApiResponse } from '#src/type/responseType.ts';
import { getRankData } from '#src/models/rankModel.ts';

const router = Router();


router.get("/", async (req, res) => {
    try {
        const rankingList = await getRankData();
        const response = ApiResponse.success(200, 'good', rankingList);
        // console.log('api res: ', response)
        return res.status(response.status).json(response);

    } catch (error: any) {
        const errorResponse = ApiResponse.error(500, "Failed to fetch ranking", error.message);
        res.status(500).json(errorResponse);
    }
});

export default router;