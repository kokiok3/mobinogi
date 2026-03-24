"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import LogoIcon from "@/assets/icons/LogoIcon"
import { TYPE, Type } from "@mobinogi/shared"
import { useState } from "react"

const MENU = [{ name: '전투력', path: '/rank', query: { t: TYPE.power } }, { name: '매력', path: '/rank', query: { t: TYPE.charm } }, { name: '생활', path: '/rank', query: { t: TYPE.living } }]
// const MENU = [{ name: '전투력', path: '/rank', query: { t: TYPE.power } }, { name: '매력', path: '/rank', query: { t: TYPE.charm } }, { name: '생활', path: '/rank', query: { t: TYPE.living } }, { name: '종합', path: '/rank', query: { t: TYPE.mix } }]

export default function Navigation() {
    const searchParams = useSearchParams()
    const queryType = searchParams.get('t') as Type || TYPE.power;

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getMenuStyle = (type: Type) => {
        const isActive = queryType === type;

        return {
            text: `flex items-center w-full h-full px-12  text-[16px]  ${isActive ? 'text-black' : ''}`,
            bar: `absolute left-0 bottom-0 w-full h-7 bg-orange rounded-t-[5px] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform ${isActive ? 'scale-y-100' : 'scale-y-0'}`,
            mobile: `${isActive ? 'text-darkorange' : ''}`
        }
    }

    return (
        <nav >
            <div className="gnb">
                {/* <Link href={'/'} className="absolute left-50 flex items-center gap-9"> */}
                <Link href={'/'} className="flex items-center gap-9">
                    <LogoIcon />

                    <div className="flex flex-col font-extrabold">
                        <span className="text-base">모비랭크</span>
                        <span className="text-orange text-xs leading-none">mobi rank</span>
                    </div>
                </Link>

                <ul className="gnb__menu__desktop">
                    {
                        MENU.map((menu) => {
                            const style = getMenuStyle(menu.query.t);

                            return (

                                <li key={menu.name} className="group relative flex items-center h-full text-gray-500 cursor-pointer">
                                    <Link href={`${menu.path}?t=${menu.query?.t}`} className={style.text}>{menu.name}</Link>
                                    <span className={style.bar}></span>
                                </li>

                            )
                        })
                    }
                </ul>

                <button className="gnb__menu__mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="icon-[tabler--menu-2] size-30" ></span>
                </button>
            </div>

            <div>
                <ul
                    data-active={isMenuOpen}
                    className="
                absolute -top-300 data-[active=true]:top-55 left-0 right-0 z-3
                p-16 pl-40 bg-white shadow-md
                transition-[top] duration-200
                ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]"
                >
                    {MENU.map(menu => {
                        return (
                            <li key={menu.name}
                                className={`h-46 px-10 hover:bg-orange-50 ${getMenuStyle(menu.query.t).mobile}`}
                                onClick={() => setIsMenuOpen(false)}>
                                <Link href={`${menu.path}?t=${menu.query?.t}`} className="inline-flex items-center w-full h-full">
                                    {menu.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div data-active={isMenuOpen}
                    className={`fixed left-0 right-0 z-2 w-full h-full hidden data-[active=true]:block`} onClick={() => setIsMenuOpen(false)}></div>
            </div>
        </nav >
    )
}