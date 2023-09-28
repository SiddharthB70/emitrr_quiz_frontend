export interface ILanguage {
    language: string;
}

export interface ILBScore {
    user: {
        username: string;
        id: string;
    };
    score: number;
}
