'use client'
import { useState } from "react"
import { authApi } from "@/services/apis";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";

interface PageProps {
    params: { email: string };
}

export default function EmailVerify({ params }: PageProps) {
    const [code, setCode] = useState<number | null>(null);
    const [loader, setLoader] = useState<boolean>(false);

    const { email } = params;
    const router = useRouter();

    const verfiyEmail = async () => {
        try {
            if (!code) {
                return toast.error('please provide code');
            }
            setLoader(true);
            const response: any = await axios.post(authApi.verfiyEmailApi, { email, code });

            if (response?.data?.success) {
                let authData = response.data;
                document.cookie = `token=${authData.token}; max-age=${23 * 60 * 60}; path=/`;
                document.cookie = `userId=${authData.userId}; max-age=${23 * 60 * 60}; path=/`;
                toast.success(response?.data?.message || 'you are logged in successfully');
                router.replace("/dashboard");
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
                <h1 className='text-center text-gray-900 text-xl font-semibold'>Verify Email</h1>
                <div className='my-5'>
                    <div>
                        <label className='text-gray-900 text-[16px]'>Enter code <span className='text-red-500'>*</span></label>
                        <input type='number' name="code" value={code || ''} onChange={(e: any) => setCode(e.target.value)} placeholder='Enter your code' className='rounded p-2 w-full text-black border border-gray-500 focus:outline-none' />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={verfiyEmail}
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
            </div>
        </div>
    )
}
