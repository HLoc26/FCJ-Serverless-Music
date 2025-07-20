// hooks/useRegister.ts
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "aws-amplify/auth";

import { validatePassword } from "../utils/validatePassword";
import type { ToasterProps } from "../interfaces/Toaster";

export const useRegister = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<ToasterProps | null>(null);

    const register = useCallback(
        async (email: string, username: string, password: string, retypePassword: string) => {
            if (!email || !username || !password || !retypePassword) {
                setToast({ message: "Missing field", type: "error" });
                return;
            }

            if (password !== retypePassword) {
                setToast({ message: "Password mismatch", type: "error" });
                return;
            }

            const passwordError = validatePassword(password);
            if (passwordError) {
                setToast({ message: passwordError, type: "error" });
                return;
            }

            try {
                await Auth.signUp({
                    username: email,
                    password,
                    options: {
                        userAttributes: {
                            preferred_username: username,
                        },
                    },
                });
                setToast({
                    message: "Register successful! Please check your email for the OTP code.",
                    type: "success",
                });
                setTimeout(() => {
                    navigate("/register/confirm", { state: { email } });
                }, 1200);
            } catch (error: any) {
                setToast({ message: error.message || "Register failed!", type: "error" });
            }
        },
        [navigate]
    );

    return { toast, setToast, register };
};
