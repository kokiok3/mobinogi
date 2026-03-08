import { Rank, FetchRankQuery, Type } from '@mobinogi/shared';
import GoldMedal from "@/assets/images/gold-medal.png"
import SilverMedal from "@/assets/images/silver-medal.png"
import BronzeMedal from "@/assets/images/bronze-medal.png"
import Image from 'next/image';


const fetchRankingData = async (type: Type) => {
    const query: FetchRankQuery = { t: type }
    const queryString = new URLSearchParams(query as unknown as Record<string, string>).toString();

    const response = await fetch(`
    ${process.env.NEXT_PUBLIC_API_URL}/rank?${queryString}`);
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
                        <th className='text-center'>순위</th>
                        <th>서버</th>
                        <th>캐릭터명</th>
                        <th>클래스</th>
                        <th>전투력</th>
                    </tr>
                </thead>
                <tbody>
                    {pagingList.length === 0 ?
                        <tr ><td colSpan={5} className='py-42 text-center'>1,000위 내에 없어요 ㅜㅜ</td></tr> :
                        pagingList?.map((rank: Rank, i: number) => {
                            return (
                                <tr key={rank.name} className="row-hover">
                                    <td className='py-42 relative text-center'>
                                        <div className='absolute top-1/2 -translate-y-1/2'>
                                            {i + 1 + startIndex === 1 &&
                                                <Image
                                                    src={GoldMedal}
                                                    alt='금메달 이미지'
                                                    width={34}
                                                    height={34}
                                                    objectFit='cover'
                                                    objectPosition='center'
                                                    unoptimized
                                                    className='relative '
                                                    data-source="https://www.flaticon.com/kr/free-animated-icons/"
                                                ></Image>}
                                            {i + 1 + startIndex === 2 &&
                                                <Image
                                                    src={SilverMedal}
                                                    alt='은메달 이미지'
                                                    width={34}
                                                    height={34}
                                                    objectFit='cover'
                                                    objectPosition='center'
                                                    unoptimized
                                                    className='relative '
                                                    data-source="https://www.flaticon.com/kr/free-animated-icons/"
                                                ></Image>}
                                            {i + 1 + startIndex === 3 &&
                                                <Image
                                                    src={BronzeMedal}
                                                    alt='동메달 이미지'
                                                    width={34}
                                                    height={34}
                                                    objectFit='cover'
                                                    objectPosition='center'
                                                    unoptimized
                                                    className='relative '
                                                    data-source="https://www.flaticon.com/kr/free-animated-icons/"
                                                ></Image>}
                                        </div>
                                        <span>{i + 1 + startIndex}</span>
                                    </td>
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