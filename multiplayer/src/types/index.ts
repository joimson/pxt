export type UiMode = "init" | "home" | "host" | "join";
export type NetMode = "init" | "connecting" | "connected";
export type ModalType =
    | "sign-in"
    | "report-abuse"
    | "host-lobby"
    | "join-lobby";

export type AppMode = {
    uiMode: UiMode;
    netMode: NetMode;
};

export const defaultAppMode: AppMode = {
    uiMode: "init",
    netMode: "init",
};

export type ClientRole = "host" | "guest";
export type GameMode = "lobby" | "playing";

export type GameInfo = {
    joinCode?: string;
    joinTicket?: string;
    affinityCookie?: string;
    gameId?: string;
    slot?: number;
};

export type GameState = GameInfo & {
    gameMode?: GameMode;
};

export namespace Cli2Srv {
    type MessageBase = {
        type: string;
    };

    export type HelloMessage = MessageBase & {
        type: "hello";
    };

    export type HeartbeatMessage = MessageBase & {
        type: "heartbeat";
    };

    export type ConnectMessage = MessageBase & {
        type: "connect";
        ticket: string;
    };

    export type StartGameMessage = MessageBase & {
        type: "start-game";
    };

    export type InputMessage = MessageBase & {
        type: "input";
        data: {
            button: number;
            state: "Pressed" | "Released" | "Held";
        };
    };

    export type ScreenMessage = MessageBase & {
        type: "screen";
        data: any; // pxsim.RefBuffer
    };

    export type ChatMessage = MessageBase & {
        type: "chat";
        text: string;
    };

    export type ReactionMessage = MessageBase & {
        type: "reaction";
        index: number;
    };

    export type Message =
        | HelloMessage
        | HeartbeatMessage
        | ConnectMessage
        | StartGameMessage
        | InputMessage
        | ScreenMessage
        | ChatMessage
        | ReactionMessage;

    export type SimMessage = ScreenMessage | InputMessage;
}

export namespace Srv2Cli {
    type MessageBase = {
        type: string;
    };

    export type HelloMessage = MessageBase & {
        type: "hello";
    };

    export type JoinedMessage = MessageBase & {
        type: "joined";
        role: ClientRole;
        slot: number;
        gameMode: GameMode;
        clientId: string;
    };

    export type StartGameMessage = MessageBase & {
        type: "start-game";
    };

    export type InputMessage = MessageBase & {
        type: "input";
        slot: number;
        data: {
            button: number;
            state: "Pressed" | "Released" | "Held";
        };
    };

    export type ScreenMessage = MessageBase & {
        type: "screen";
        data: any; // pxsim.RefBuffer
    };

    export type ChatMessage = MessageBase & {
        type: "chat";
        text: string;
    };

    export type PresenceMessage = MessageBase & {
        type: "presence";
        presence: Presence;
    };

    export type ReactionMessage = MessageBase & {
        type: "reaction";
        index: number;
        clientId: string;
    };

    export type PlayerJoinedMessage = MessageBase & {
        type: "player-joined";
        clientId: string;
    };

    export type PlayerLeftMessage = MessageBase & {
        type: "player-left";
        clientId: string;
    };

    export type Message =
        | HelloMessage
        | JoinedMessage
        | StartGameMessage
        | InputMessage
        | ScreenMessage
        | ChatMessage
        | PresenceMessage
        | ReactionMessage
        | PlayerJoinedMessage
        | PlayerLeftMessage;
}

export type ToastType = "success" | "info" | "warning" | "error";

export type Toast = {
    type: ToastType;
    text?: string; // primary message
    detail?: string; // secondary message
    jsx?: React.ReactNode; // React content
    timeoutMs?: number; // if provided, will auto-dismiss after a time
    weight?: number; // heavier toasts sort downward
    textColorClass?: string; // if provided, override default text color
    backgroundColorClass?: string; // if provided, override default background color
    sliderColorClass?: string; // if provided, override default timeout slider color
    hideDismissBtn?: boolean; // if true, will hide the dismiss button
    showSpinner?: boolean; // if true, will show a spinner icon
    hideIcon?: boolean; // if true, will hide the type-specific icon
};

export type ToastWithId = Toast & {
    id: string;
};

export type UserInfo = {
    id: string;
    slot: number;
    role: ClientRole;
    name: string;
};

export type Presence = {
    users: UserInfo[];
};

export const defaultPresence: Presence = {
    users: [],
};

export type Dimension = {
    width: number;
    height: number;
};

export namespace SimMultiplayer {
    type MessageBase = {
        type: "multiplayer";
        content: string;
        origin?: "server" | "client";
        broadcast?: boolean;
    };
    export type ImageMessage = MessageBase & {
        content: "Image";
        image: any; // pxsim.RefBuffer
    };

    export type InputMessage = MessageBase & {
        content: "Button";
        button: number;
        clientNumber: number;
        state: "Pressed" | "Released" | "Held";
    };

    export type Message = ImageMessage | InputMessage;
}