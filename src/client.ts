// import { FetchResponse } from "openapi-fetch";
import { FetchResponse } from "openapi-fetch";
import type { paths, operations } from "./gen/openapi-types";
import createClient from "openapi-fetch";

type CreateRoomBodyTypes = NonNullable<operations["post_CreateRoom"]["requestBody"]>["content"]["application/json"];
type UpdateRoomBodyTypes = NonNullable<operations["put_UpdateRoomEndpoint"]["requestBody"]>["content"]["application/json"];

type ApiFetchResponse<T> = {
    response: FetchResponse<any, any>["response"];
    data?: T;
    error?: any;
};

async function processApiCall<T>(ret: ApiFetchResponse<T>) {
    if (!ret.response.ok) {
        throw new Error(`API error: ${JSON.stringify(ret.error)}`);
    }
    if (ret.data && Object.keys(ret.data).length !== 0) return ret.data;
    return;
}

export class EZChatClient {
    private oaiFetchClient: ReturnType<typeof createClient<paths>>;

    constructor(apiKey: string) {
        this.oaiFetchClient = createClient<paths>({
            baseUrl: "http://127.0.0.1:8787",
            headers: { Authorization: `Bearer ${apiKey}` },
        });
    }

    async getToken(chatterId: number) {
        const ret = await this.oaiFetchClient.GET("/chatters/{chatterId}/accessToken", {
            params: {
                path: { chatterId },
            },
        });
        return processApiCall(ret);
    }

    async getChatter(chatterId: number) {
        const ret = await this.oaiFetchClient.GET("/chatters/{chatterId}", {
            params: {
                path: { chatterId },
            },
        });
        return processApiCall(ret);
    }

    async getAllChatters(page?: number, size?: number) {
        const ret = await this.oaiFetchClient.GET("/chatters", {
            params: {
                query: { page, size },
            },
        });
        return processApiCall(ret);
    }

    async createChatter(chatterName: string) {
        const ret = await this.oaiFetchClient.POST("/chatters", {
            body: {
                name: chatterName,
            },
        });
        return processApiCall(ret);
    }

    async deleteChatter(chatterId: number) {
        const ret = await this.oaiFetchClient.DELETE("/chatters/{chatterId}", {
            params: {
                path: { chatterId: chatterId },
            },
        });
        return processApiCall(ret);
    }

    async getMessage(messageId: number) {
        const ret = await this.oaiFetchClient.GET("/messages/{messageId}", {
            params: {
                path: { messageId },
            },
        });
        return processApiCall(ret);
    }

    async deleteMessage(messageId: number) {
        const ret = await this.oaiFetchClient.DELETE("/messages/{messageId}", {
            params: {
                path: { messageId },
            },
        });
        return processApiCall(ret);
    }

    async createRoom(roomStatus?: CreateRoomBodyTypes["roomStatus"], roomType?: CreateRoomBodyTypes["roomType"]) {
        const ret = await this.oaiFetchClient.POST("/rooms", {
            body: {
                roomStatus,
                roomType,
            },
        });
        return processApiCall(ret);
    }

    async getRoom(roomId: number) {
        const ret = await this.oaiFetchClient.GET("/rooms/{roomId}", {
            params: {
                path: { roomId },
            },
        });
        return processApiCall(ret);
    }

    async updateRoom(roomId: number, roomType?: UpdateRoomBodyTypes["roomType"], roomStatus?: UpdateRoomBodyTypes["roomStatus"]) {
        const ret = await this.oaiFetchClient.PUT("/rooms/{roomId}", {
            params: {
                path: { roomId },
            },
            body: {
                roomType,
                roomStatus,
            },
        });
        return processApiCall(ret);
    }

    async getChattersInRoom(roomId: number) {
        const ret = await this.oaiFetchClient.GET("/rooms/{roomId}/chatters", {
            params: {
                path: { roomId },
            },
        });
        return processApiCall(ret);
    }

    async addChatterToRoom(roomId: number, chatterId: number) {
        const ret = await this.oaiFetchClient.POST("/rooms/{roomId}/chatters/{chatterId}", {
            params: {
                path: { roomId, chatterId },
            },
        });
        return processApiCall(ret);
    }

    async removeChatterFromRoom(roomId: number, chatterId: number) {
        const ret = await this.oaiFetchClient.DELETE("/rooms/{roomId}/chatters/{chatterId}", {
            params: {
                path: { roomId, chatterId },
            },
        });
        return processApiCall(ret);
    }
}
