export type SocketResponse = {
    success: boolean;
    message: string;
    payload: {
        gameToken: string;
        playerID: string;
    }
};

export type SocketEvent = "create_game" | "join_game" | "player_joined" | "game_created";