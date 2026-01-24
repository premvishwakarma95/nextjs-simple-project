'use client'
import { useState } from "react"
import { authData } from "@/lib/type";
import { authApi } from "@/services/apis";
import toast from 'react-hot-toast';
import axios from "axios";

export default function page() {
    const [userData, setUserData] = useState<authData>({ email: '', password: '' });

    const onChangeFunction = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const login = async () => {
        try {
            if (!userData.email || !userData.password) {
                return toast.error('please provide email and password');
            } else if(!userData.email.includes('@')) {
                return toast.error('please provide valid email');
            }

            const response: any = await axios.post(authApi.loginApi, userData);

            if(response?.data?.success) {
                let authData = response.data;
                localStorage.setItem('token', authData.token);
                localStorage.setItem('userId', authData.userId);
                toast.success(response?.data?.message || 'you are logged in successfully');
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'server error');
        }
    }

    return (
        <div className='min-w-full min-h-[100vh] flex justify-center items-center bg-white'>
            <div className='max-w-[400px] p-4 rounded shadow-2xl bg-white'>
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
                </div>
                <div className='flex justify-center'>
                    <button onClick={login} className='rounded p-2 bg-blue-600 '>Submit</button>
                </div>
            </div>
        </div>
    )
}
