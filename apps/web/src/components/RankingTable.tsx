import { Rank, FetchRankQuery, Type } from '@mobinogi/shared';


const fetchRankingData = async (type: Type) => {
    const query: FetchRankQuery = { t: type }
    const queryString = new URLSearchParams(query as unknown as Record<string, string>).toString();

    const response = await fetch(`http://localhost:8000/mobinogi?${queryString}`);
    const data = await response.json();
    return data.data;
}

export default async function RankingTable({ page, type }: { page: number, type: Type }) {
    const rankingList = await fetchRankingData(type);
    console.log('rankingList: ', rankingList)

    // page + 20개 자르기
    // 예를 들면 1페이지면 1~20, 2페이지면 21~ 40, 3페이지면 31~50
    // 시작인덱스 가져오기
    const startIndex = (page - 1) * 20
    const pagingList = rankingList.splice(startIndex, 20);

    return (
        <div className="mt-16 card border-base-content/10 border">
            <table className="table table-lg bg-white">
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>서버</th>
                        <th>캐릭터명</th>
                        <th>클래스</th>
                        <th>전투력</th>
                    </tr>
                </thead>
                <tbody>

                    {pagingList?.map((rank: Rank, i: number) => {
                        return (
                            <tr key={rank.name} className="row-hover">
                                <td className=' py-42'>{i + 1}</td>
                                <td className=' py-42'>{rank.server}</td>
                                <td className=' py-42'>{rank.name}</td>
                                <td className=' py-42'>{rank.class}</td>
                                <td className=' py-42'>{rank.power}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>



    )
}