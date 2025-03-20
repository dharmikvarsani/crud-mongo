"use client"
import GithubLogin from '@/app/components/githubLogin';
import GoogleLogin from '@/app/components/googleLogin';
import { loginSchema } from '@/app/schema/loginSchema';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Login = () => {
    const { data: session, status } = useSession()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginValidation = loginSchema.safeParse({ email, password })
        if (!loginValidation.success) {
            const newError = {}
            loginValidation.error.errors.forEach((err) => {
                newError[err.path[0]] = err.message
            })
            setError(newError)
            return;
        }

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (res.error) {
                setError((prev) => ({ ...prev, general: "Invalid credentials" }))
                return;
            }
            toast.success("Login Successfully 🎉")
            setTimeout(() => {
                router.push("/")
            }, 1000);

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='grid place-items-center h-screen' >
            <div className=' shadow-lg p-6 rounded-lg border-1 flex flex-col gap-5 w-70 ' >
                <div>
                    <h2 className='font-bold text-2xl text-green-400' >Log-In</h2>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col  gap-2' >
                    <input
                        type="text"
                        placeholder='Enter Your Email'
                        className='border-1 h-7 w-57.5 rounded-sm ps-2 font-medium text-sm'
                        onChange={e => setEmail(e.target.value)}
                    />
                    {error.email && <p className='text-red-500 text-xs '>{error.email}</p>}
                    <input
                        type="text"
                        placeholder='Enter Password'
                        className='border-1 h-7 w-57.5 rounded-sm ps-2 font-medium text-sm'
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error.password && <p className='text-red-500 text-xs '>{error.password}</p>}
                    <button className='bg-green-400 text-lg font-bold text-white px-4 py-1 rounded-lg mt-3 w-57.5 ' >LogIn</button>
                </form>
                <div>
                    <div>
                        {error.general && (
                            <p className='font-bold text-xs rounded-sm bg-red-600 text-white px-2 py-0.5 w-30 ' >{error.general}</p>
                        )
                        }
                    </div>
                    <Link href={'/auth/signup'}>don't have a account? <span className='underline' >signup</span></Link>
                    <br />
                    <br />
                    <p className='flex justify-center items-center font-bold' >Or</p>
                    <br />
                    <div className='flex flex-col gap-3'>
                        <div onClick={() => signIn("google")} ><GoogleLogin /></div>
                        <div onClick={() => signIn("github")} ><GithubLogin /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
