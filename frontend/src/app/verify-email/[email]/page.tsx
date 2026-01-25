'use client';

import { useState } from "react";
import { authApi } from "@/services/apis";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EmailVerify() {
    const [code, setCode] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);

    const router = useRouter();
    const params = useParams();

    const email = decodeURIComponent(params.email as string);

    const verifyEmail = async () => {
        try {
            if (!code) {
                return toast.error("Please provide code");
            }

            setLoader(true);

            const response = await axios.post(authApi.verfiyEmailApi, {
                email,
                code,
            });

            if (response?.data?.success) {
                toast.success(response.data?.message || "Email verified successfully");
                router.replace("/login");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Server error");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-[91vh] flex justify-center items-center bg-white">
            <div className="w-full max-w-[400px] p-6 rounded shadow-2xl bg-white">
                <h1 className="text-center text-gray-900 text-xl font-semibold">
                    Verify Email
                </h1>

                <div className="my-5">
                    <label className="text-sm text-gray-700">
                        Enter code <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="number"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your code"
                        className="mt-1 rounded p-2 w-full text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={verifyEmail}
                        disabled={loader}
                        className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white font-medium
            transition hover:bg-blue-700 disabled:opacity-70"
                    >
                        {loader ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Processing...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
