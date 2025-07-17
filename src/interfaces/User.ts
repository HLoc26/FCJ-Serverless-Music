import type { JwtPayload } from "@aws-amplify/core/internals/utils";

export interface User {
    id: string;
    username: string;
    email: string;
    displayName: string;
    token: JwtPayload | undefined;
}
