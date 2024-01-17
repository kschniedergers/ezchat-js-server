import createClient from "openapi-fetch";
import { paths, operations } from "./gen/openapi-types";

// well this is a line of code
type CreateRoomBodyTypes = NonNullable<operations["post_CreateRoomEndpoint"]["requestBody"]>["content"]["application/json"];
type UpdateRoomBodyTypes = NonNullable<operations["put_UpdateRoomEndpoint"]["requestBody"]>["content"]["application/json"];

export class EZChatClient {
    private oaiFetchClient: ReturnType<typeof createClient<paths>>;

    constructor(apiKey: string) {
        // this.apiKey = apiKey;
        this.oaiFetchClient = createClient<paths>({
            baseUrl: "http://localhost:8787",
            headers: { Authorization: `Bearer ${apiKey}` },
        });
    }

    getToken(chatterId: number) {
        return this.oaiFetchClient.GET("/chatters/{chatterId}/accessToken", {
            params: {
                path: { chatterId },
            },
        });
    }

    getChatter(chatterId: number) {
        return this.oaiFetchClient.GET("/chatters/{chatterId}", {
            params: {
                path: { chatterId },
            },
        });
    }

    getAllChatters(page?: number, size?: number) {
        return this.oaiFetchClient.GET("/chatters", {
            params: {
                query: { page, size },
            },
        });
    }

    createChatter(chatterName: string) {
        return this.oaiFetchClient.POST("/chatters", {
            body: {
                chatterName,
            },
        });
    }

    deleteChatter(chatterId: number) {
        return this.oaiFetchClient.DELETE("/chatters/{chatterId}", {
            params: {
                path: { chatterId: chatterId },
            },
        });
    }

    getMessage(messageId: number) {
        return this.oaiFetchClient.GET("/messages/{messageId}", {
            params: {
                path: { messageId },
            },
        });
    }

    deleteMessages(messageId: number) {
        return this.oaiFetchClient.DELETE("/messages/{messageId}", {
            params: {
                path: { messageId },
            },
        });
    }

    createRoom(roomStatus?: CreateRoomBodyTypes["roomStatus"], roomType?: CreateRoomBodyTypes["roomType"]) {
        return this.oaiFetchClient.POST("/rooms", {
            body: {
                roomStatus,
                roomType,
            },
        });
    }

    getRoom(roomId: number) {
        return this.oaiFetchClient.GET("/rooms/{roomId}", {
            params: {
                query: { roomId },
            },
        });
    }

    updateRoom(roomId: number, roomType: UpdateRoomBodyTypes["roomType"], roomStatus: UpdateRoomBodyTypes["roomStatus"]) {
        return this.oaiFetchClient.PUT("/rooms/{roomId}", {
            params: {
                query: { roomId },
            },
            body: {
                roomType,
                roomStatus,
            },
        });
    }

    getChattersInRoom(roomId: number) {
        return this.oaiFetchClient.GET("/rooms/{roomId}/chatters", {
            params: {
                path: { roomId },
            },
        });
    }

    addChatterToRoom(roomId: number, chatterId: number) {
        return this.oaiFetchClient.POST("/rooms/{roomId}/chatters/{chatterId}", {
            params: {
                path: { roomId, chatterId },
            },
        });
    }

    removeChatterFromRoom(roomId: number, chatterId: number) {
        return this.oaiFetchClient.DELETE("/rooms/{roomId}/chatters/{chatterId}", {
            params: {
                path: { roomId, chatterId },
            },
        });
    }

    // TODO get messages from room
}
