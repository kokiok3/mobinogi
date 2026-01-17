"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoIcon from "assets/icons/LogoIcon"

const MENU = [{ name: '전투력', path: '/rank' }, { name: '매력', path: '/rank-charm' }, { name: '생활', path: '/rank-living' }, { name: '종합', path: 'rank-total' }]

export default function Navigation() {
    const currentPath = usePathname();
    const getMenuStyle = (path: string) => {
        const isActive = currentPath === path;

        return {
            text: `text-[16px] ${isActive ? 'text-black' : ''}`,
            bar: `absolute left-0 bottom-0 w-full h-7 bg-orange rounded-t-[5px] transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform ${isActive ? 'scale-y-100' : 'scale-y-0'}`
        }
    }

    return (
        <nav className="flex items-center mx-auto justify-center w-full h-55 bg-white sticky top-0">
            <div className="absolute left-50 flex  items-center gap-9 ">
                <LogoIcon />

                <div className="flex flex-col font-extrabold">
                    <span className="text-base">모비랭크</span>
                    <span className="text-orange text-xs leading-none
">mobi rank</span>

                </div>
            </div>
            <ul className="flex gap-20 h-full">
                {
                    MENU.map((menu) => {
                        const style = getMenuStyle(menu.path);

                        return (

                            <li key={menu.name} className="group relative flex items-center h-full px-12 text-gray-500 cursor-pointer ">
                                <span className={style.text}><Link href={menu.path}>{menu.name}</Link></span>
                                <span className={style.bar}></span>
                            </li>

                        )
                    })
                }
            </ul>
        </nav>
    )
}