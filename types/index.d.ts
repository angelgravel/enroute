export type GameCreatedSocketResponse = {
    created: boolean;
    // message: string;
    message: {
        gameToken: string;
        playerID: string;
    }
};

export type PlayerJoinedSocketResponse = {
    joined: boolean;
    // gameToken: string
    // message: string;
    message: {
        gameToken: string;
        playerID: string;
    }
};

export type SocketEvent = "create_game" | "join_game" | "player_joined" | "game_created";