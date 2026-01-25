'use client'
import { useState } from "react"
import { authApi } from "@/services/apis";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
    const [email, setEmail] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);

    const router = useRouter();

    const forgetPassword = async () => {
        try {
            if (!email) {
                return toast.error('please provide email');
            } else if (!email.includes('@')) {
                return toast.error('please provide valid email');
            }
            setLoader(true);
            const response: any = await axios.post(authApi.forgotPasswordApi, { email });

            if (response?.data?.success) {
                let authData = response.data;
                toast.success(authData?.message || 'we have sent email to you please check your inbox');
                router.replace("/login");
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'server error');
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className='min-w-full min-h-[91vh] flex justify-center items-center bg-white'>
            <div className='max-w-[400px] p-6 rounded shadow-2xl bg-white'>
                <h1 className='text-center text-gray-900 text-xl font-semibold'>Forget Password</h1>

                <div className='my-5'>
                    <p className="text-center text-gray-700 mb-4 text-sm">Enter your email and we'll send you a link to reset your password.</p>
                    <div className="mt-4">
                        <label className="text-sm text-gray-700">Enter email <span className='text-red-500'>*</span></label>
                        <input type='email' name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter your email' className='rounded p-2 w-full text-black border border-gray-500 focus:outline-none' />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={forgetPassword}
                        disabled={loader}
                        className={`flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white font-medium
      transition-all duration-200
      hover:bg-blue-700
      disabled:cursor-not-allowed disabled:opacity-70`}
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
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-sm text-blue-600">Back to Login</Link>
                </div>
            </div>
        </div>
    )
}
