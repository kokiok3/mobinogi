export interface Rank {
    rank?: string
    server: string
    name: string
    class: string
    power: string
}

export const Type = {
    power: 1,
    charm: 2,
    living: 3,
    mix: 4
} as const;

export const Server = {
    dayan: 1,
    ira: 2,
    // duncan: 3,
    // alisa: 4,
    // maven: 5,
    // lasa: 6,
    // calix: 7
} as const;
// export const Server = {
//     dayan: 1,
//     ira: 2,
//     duncan: 3,
//     alisa: 4,
//     maven: 5,
//     lasa: 6,
//     calix: 7
// } as const;

export const Class = {
    all: 0
} as const;

export interface FetchRank {
    type: (typeof Type)[keyof typeof Type],
    server: (typeof Server)[keyof typeof Server],
    page: number,
    search?: string
}