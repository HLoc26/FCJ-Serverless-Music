// hooks/useRegister.ts
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "aws-amplify/auth";
import type { ToasterType } from "../components/shared/Toaster";

export const useRegister = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<{ message: string; type: ToasterType } | null>(null);

    const validatePassword = (password: string): string | null => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must include at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must include at least one lowercase letter.";
        }
        if (!/\d/.test(password)) {
            return "Password must include at least one number.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password must include at least one special character.";
        }
        return null;
    };

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
