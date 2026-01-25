'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { authApi } from "@/services/apis";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ✅ Extract token from URL
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loader, setLoader] = useState(false);

    const resetPassword = async () => {
        try {
            if (!token) {
                return toast.error("Invalid or missing token");
            }

            if (!password || !confirmPassword) {
                return toast.error("All fields are required");
            }

            if (password !== confirmPassword) {
                return toast.error("Passwords do not match");
            }

            setLoader(true);

            const response = await axios.post(authApi.resetPasswordApi, {
                token,
                password,
            });

            if (response?.data?.success) {
                toast.success(response.data.message || "Password reset successful");
                router.replace("/login");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Server error");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[91vh] flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-[420px] rounded-lg bg-white p-6 shadow-xl">
                <h1 className="text-center text-xl font-semibold text-gray-900">
                    Reset Password
                </h1>

                <div className="mt-5 space-y-4">
                    <div>
                        <label className="text-sm text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="mt-1 w-full text-gray-700 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={resetPassword}
                        disabled={loader}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white font-medium
            transition hover:bg-blue-700 disabled:opacity-70"
                    >
                        {loader ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Processing...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
