import { API_URL } from "../lib/env";

export const authApi: any = {
    registerApi: `${API_URL}/auth/register`,
    loginApi: `${API_URL}/auth/login`,
    verfiyEmailApi: `${API_URL}/auth/verify-email`,
    forgotPasswordApi: `${API_URL}/auth/forgot-password`,
    resetPasswordApi: `${API_URL}/auth/reset-password`,
}
