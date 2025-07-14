import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const cognitoAuthConfig = {
    authority: process.env.REACT_APP_COGNITO_AUTHORITY ?? "your_cognito_authority",
    client_id: process.env.REACT_APP_CLIENT_ID ?? "your_cognito_client_id",
    redirect_uri: process.env.REACT_APP_REDIRECT_URI ?? "http://localhost:5173/auth/callback",
    response_type: "code",
    scope: process.env.REACT_APP_AUTH_SCOPE,
    loadUserInfo: true,
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: window.sessionStorage })
};

export const userManager = new UserManager(cognitoAuthConfig);
