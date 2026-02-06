interface Rank {
    rank?: string
    server: string
    name: string
    class: string
    power: string
}

const Type = {
    power: 1,
    charm: 2,
    living: 3,
    mix: 4
} as const;

const Server = {
    dayan: 1,
    ira: 2,
    duncan: 3,
    alisa: 4,
    maven: 5,
    lasa: 6,
    calix: 7
} as const;

const Class = {
    all: 0
} as const;

interface FetchRank {
    type: (typeof Type)[keyof typeof Type],
    server: (typeof Server)[keyof typeof Server],
    page: number,
    search?: string
}

const fetchRankingData = async () => {
    const response = await fetch('http://localhost:8000/mobinogi');
    const data = await response.json();
    return data.data;
}

export default async function RankingTable({ page }: { page: number }) {
    console.log('page: ', page)

    const rankingList = await fetchRankingData();
    console.log('rankingList: ', rankingList);

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