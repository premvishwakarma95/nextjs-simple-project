'use client'
import { useState } from "react"
import { authData } from "@/lib/type";
import { authApi } from "@/services/apis";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
    const [userData, setUserData] = useState<authData>({ email: '', password: '' });

    const router = useRouter();

    const onChangeFunction = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const login = async () => {
        try {
            if (!userData.email || !userData.password) {
                return toast.error('please provide email and password');
            } else if (!userData.email.includes('@')) {
                return toast.error('please provide valid email');
            }

            const response: any = await axios.post(authApi.loginApi, userData);

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
        }
    }

    return (
        <div className='min-w-full min-h-[91vh] flex justify-center items-center bg-white'>
            <div className='max-w-[400px] p-6 rounded shadow-2xl bg-white'>
                <h1 className='text-center text-gray-900 text-xl font-semibold'>Login</h1>
                <div className='my-5'>
                    <div>
                        <label className='text-gray-900 text-[16px]'>Enter email <span className='text-red-500'>*</span></label>
                        <input type='email' name="email" value={userData.email} onChange={onChangeFunction} placeholder='enter your email' className='rounded p-2 w-full text-black border border-gray-500 focus:outline-none' />
                    </div>
                    <div className='mt-3'>
                        <label className='text-gray-900 text-[16px]'>Enter password <span className='text-red-500'>*</span></label>
                        <input type='password' name="password" value={userData.password} onChange={onChangeFunction} placeholder='enter your password' className='rounded p-2 w-full text-black border border-gray-500 focus:outline-none' />
                    </div>
                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-blue-600 float-right mt-2">Forgot Password?</Link>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={login} className='rounded py-2 px-4 bg-blue-600 text-white'>Submit</button>
                </div>
                <div>
                    <p className="text-center mt-4 text-gray-700">Don't have an account? <Link href="/register" className="text-blue-600">Register</Link></p>
                </div>
            </div>
        </div>
    )
}
