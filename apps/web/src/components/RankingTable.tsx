import { Rank, Type, TYPE_KOREAN } from '@mobinogi/shared';
import GoldMedal from "@/assets/images/gold-medal.png"
import SilverMedal from "@/assets/images/silver-medal.png"
import BronzeMedal from "@/assets/images/bronze-medal.png"
import Image from 'next/image';

export default function RankingTable({
    list,
    page,
    type,
}: {
    list: Rank[];
    page: number;
    type: Type;
}) {
    // page + 20개 자르기
    // 예를 들면 1페이지면 1~20, 2페이지면 21~ 40, 3페이지면 31~50
    // 시작인덱스 가져오기
    const startIndex = (page - 1) * 20
    const pagingList = list.slice(startIndex, startIndex + 20);

    const isShowRank = (index: number) => {
        return (index + 1 + startIndex === 1 ||
            index + 1 + startIndex === 2 ||
            index + 1 + startIndex === 3 ? 'hidden' : '')
    }

    return (
        <div>
            <div className="hidden xl:block mt-16 card border-base-content/10 border">
                <table className="table table-lg bg-white ">
                    <thead>
                        <tr>
                            <th className='text-center'>순위</th>
                            <th>서버</th>
                            <th>캐릭터명</th>
                            <th>클래스</th>
                            <th>{TYPE_KOREAN[type]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagingList.length === 0 ?
                            <tr ><td colSpan={5} className='py-42 text-center'>500위 내에 없어요 ㅜㅜ</td></tr>
                            : pagingList?.map((rank: Rank, i: number) => {
                                return (
                                    <tr key={rank.name} className="row-hover">
                                        <td className='py-42 relative text-center'>
                                            <div className='absolute top-1/2 left-1/2 -translate-1/2'>
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
                                            <span className={isShowRank(i)}>{i + 1 + startIndex}</span>
                                        </td>
                                        <td className='py-42'>{rank.server}</td>
                                        <td className='py-42'>{rank.name}</td>
                                        <td className='py-42'>{rank.class}</td>
                                        <td className='py-42'>{Number(rank.power).toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>

            <div className='rank__list xl:hidden mt-16 px-30 bg-white'>
                {pagingList.length === 0 ? <span className='py-50 text-center text-gray-500'>500위 내에 없어요 ㅜㅜ</span>
                    : pagingList?.map((rank: Rank, i: number) => {
                        return (
                            <div key={rank.name} className='rank__item'>
                                <div>
                                    <div>{i + 1 + startIndex === 1 &&
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
                                        <span className={isShowRank(i)}>{i + 1 + startIndex}</span>
                                    </div>
                                </div>
                                <div className='rank__info'>
                                    <span className='w-120'>서버</span>
                                    <span>{rank.server}</span>
                                </div>
                                <div className='rank__info'>
                                    <span className='w-120'>캐릭터명</span>
                                    <span>{rank.name}</span>
                                </div>
                                <div className='rank__info'>
                                    <span className='w-120'>클래스</span>
                                    <span>{rank.class}</span>
                                </div>
                                <div className='rank__info'>
                                    <span className='w-120'>{TYPE_KOREAN
                                    [type]}</span>
                                    <span>{Number(rank.power).toLocaleString()}</span>
                                </div>
                            </div>
                        )
                    })

                }

            </div>
        </div>

    )
}