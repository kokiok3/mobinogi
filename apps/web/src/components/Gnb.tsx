"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import LogoIcon from "@/assets/icons/LogoIcon"
import { TYPE, Type } from "@mobinogi/shared"

const MENU = [{ name: '전투력', path: '/rank', query: { t: TYPE.power } }, { name: '매력', path: '/rank', query: { t: TYPE.charm } }, { name: '생활', path: '/rank', query: { t: TYPE.living } }, { name: '종합', path: '/rank', query: { t: TYPE.mix } }]

export default function Navigation() {
    const searchParams = useSearchParams()
    const queryType = searchParams.get('t') as Type;

    const getMenuStyle = (type: Type) => {
        const isActive = queryType === type;

        return {
            text: `flex items-center w-full h-full px-12  text-[16px]  ${isActive ? 'text-black' : ''}`,
            bar: `absolute left-0 bottom-0 w-full h-7 bg-orange rounded-t-[5px] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform ${isActive ? 'scale-y-100' : 'scale-y-0'}`
        }
    }

    return (
        <nav className="sticky top-0 z-2 flex items-center mx-auto justify-center w-full h-55 bg-white ">
            <Link href={'/'} className="absolute left-50 flex  items-center gap-9 ">
                <LogoIcon />

                <div className="flex flex-col font-extrabold">
                    <span className="text-base">모비랭크</span>
                    <span className="text-orange text-xs leading-none
">mobi rank</span>

                </div>
            </Link>
            <ul className="flex gap-20 h-full">
                {
                    MENU.map((menu) => {
                        const style = getMenuStyle(menu.query.t);

                        return (

                            <li key={menu.name} className="group relative flex items-center h-full text-gray-500 cursor-pointer ">
                                <Link href={`${menu.path}?t=${menu.query?.t}`} className={style.text}>{menu.name}</Link>
                                <span className={style.bar}></span>
                            </li>

                        )
                    })
                }
            </ul>
        </nav>
    )
}