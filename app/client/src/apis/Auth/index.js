import { feedback } from "./feedback"
import { login } from "./login"
import { register } from "./register"
import { send_verifyEmail } from "./send_verifyEmail"

export const useAuth = {
    login,
    register,
    feedback,
    send_verifyEmail
}