'use client'

import { useState } from 'react'
import { registerData } from '@/lib/type';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authApi } from "@/services/apis";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
    const [registerData, setRegisterData] = useState<registerData>({ name: '', email: '', number: '', password: '' });
    const [loader, setLoader] = useState<boolean>(false);

    const router = useRouter();

    function onchageFun(e: any) {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }

    async function register() {
        try {
            if (!registerData.name || !registerData.email || !registerData.number || !registerData.password) {
                return toast.error('please provide all value');
            } else if (String(registerData.number).length !== 10) {
                return toast.error('please provide correct number');
            }
            setLoader(true);
            const res = await axios.post(authApi.registerApi, registerData);
            let data = res.data;
            if (data.success) {
                toast.success(data.message || 'registered successfully now please check you email');
                router.replace(`/verify-email/${registerData.email}`)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'server error')
        } finally {
            setLoader(false);
        }
    }
    return (
        <div className='min-h-[91vh] min-w-full flex justify-center items-center bg-white text-gray-900'>
            <div className='min-w-[400px] p-6 rounded shadow-2xl'>
                <h1 className='text-center text-gray-900 text-xl font-semibold mb-4'>Register</h1>
                <div className='mb-3'>
                    <label className="text-sm text-gray-700">Enter full name <span className='text-red-500'>*</span></label>
                    <input type='text' name='name' value={registerData.name} onChange={onchageFun} placeholder='Enter your full name' className='p-2 rounded border text-gray-700 w-full focus:outline-none' />
                </div>
                <div className='mb-3'>
                    <label className="text-sm text-gray-700">Enter email <span className='text-red-500'>*</span></label>
                    <input type='email' name='email' value={registerData.email} onChange={onchageFun} placeholder='Enter your email' className='p-2 rounded border text-gray-700 w-full focus:outline-none' />
                </div>
                <div className='mb-3'>
                    <label className="text-sm text-gray-700">Enter number <span className='text-red-500'>*</span></label>
                    <input type='number' name='number' value={registerData.number} onChange={onchageFun} placeholder='Enter your number' className='p-2 rounded border text-gray-700 w-full focus:outline-none' />
                </div>
                <div className='mb-3'>
                    <label className="text-sm text-gray-700">Enter password <span className='text-red-500'>*</span></label>
                    <input type='password' name='password' value={registerData.password} onChange={onchageFun} placeholder='Enter your password' className='p-2 rounded border text-gray-700 w-full focus:outline-none' />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={register}
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
                <div>
                    <p className="text-center mt-4 text-gray-700">Already have an account? <Link href="/login" className="text-blue-600">Login</Link></p>
                </div>
            </div>
        </div>
    )
}
