export type GameCreatedSocketResponse = {
    created: boolean;
    response: string;
};

export type PlayerJoinedSocketResponse = {
    joined: boolean;
    gameToken: string
    response: string;
};