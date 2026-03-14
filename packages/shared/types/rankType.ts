export const TYPE = {
    power: '1',
    charm: '2',
    living: '3',
    mix: '4'
} as const;
export type Type = (typeof TYPE)[keyof typeof TYPE];

export const TYPE_KOREAN = {
    [TYPE.power]: '전투력',
    [TYPE.charm]: '매력',
    [TYPE.living]: '생활',
    [TYPE.mix]: '종합'
}
export type TypeKorean = (typeof TYPE_KOREAN)[keyof typeof TYPE_KOREAN]

export interface Rank {
    rank?: string
    server: string
    name: string
    class: string
    power: string
}

export const SERVER = {
    dayan: 1,
    ira: 2,
    duncan: 3,
    alisa: 4,
    maven: 5,
    lasa: 6,
    calix: 7
} as const;

export const CLASS = {
    all: 0
} as const;

export interface FetchRank {
    type: (typeof TYPE)[keyof typeof TYPE],
    server: (typeof SERVER)[keyof typeof SERVER],
    page: number,
    search?: string
}