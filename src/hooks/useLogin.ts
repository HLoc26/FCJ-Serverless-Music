import * as Auth from "aws-amplify/auth"
import { type User } from "../interfaces/User"
interface LoginProps {
    email: string,
    password: string
}

const useLogin = () => {
    const login = async ({ email, password }: LoginProps) => {
        try {
            // await Auth.signIn({
            //     username: email,
            //     password: password,
            // });
            const user = await Auth.getCurrentUser();
            console.log(user);

            const session = await Auth.fetchAuthSession();
            const currentUser: User = {
                id: user.userId,
                username: user.username,
                email: session.tokens?.idToken?.payload.email?.toString() ?? "",
                displayName: session.tokens?.idToken?.payload.preferred_username?.toString() ?? "",
                token: session.tokens?.idToken?.payload,
            };

            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // console.log(currentUser);

            return {
                currentUser,
                success: true,
                message: "Login successful!"
            }
        } catch (error: any) {
            return {
                currentUser: null,
                success: false,
                message: error.message || "Login failed!"
            }
        }
    };
    return [login]
}

export default useLogin;