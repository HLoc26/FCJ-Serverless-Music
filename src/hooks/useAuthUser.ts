import { useState, useEffect } from "react";
import * as Auth from "aws-amplify/auth";
import { type User } from "../interfaces";

export const useAuthUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const loadUserFromStorage = () => {
            const stored = localStorage.getItem("currentUser");
            if (stored) {
                try {
                    const parsed = JSON.parse(stored) as User;
                    setCurrentUser(parsed);
                    setIsAuthenticated(true);
                } catch {
                    console.warn("Invalid user in storage");
                }
            }
        };

        const checkAuthWithAmplify = async () => {
            try {
                const user = await Auth.getCurrentUser();
                const session = await Auth.fetchAuthSession();

                const fullUser: User = {
                    id: user.userId,
                    username: user.username,
                    email: session.tokens?.idToken?.payload.email?.toString() ?? "",
                    displayName: session.tokens?.idToken?.payload.preferred_username?.toString() ?? "",
                    token: session.tokens?.idToken?.payload,
                }

                setCurrentUser(fullUser);
                setIsAuthenticated(true);
                localStorage.setItem("currentUser", JSON.stringify(fullUser));
            } catch {
                setIsAuthenticated(false);
                const guest: User = {
                    id: "",
                    username: "guest",
                    email: "",
                    displayName: "guest",
                    token: {},
                };
                setCurrentUser(guest);
                localStorage.setItem("currentUser", JSON.stringify(guest));
            }
        };

        loadUserFromStorage();
        checkAuthWithAmplify();
    }, []);

    return { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated };
};
