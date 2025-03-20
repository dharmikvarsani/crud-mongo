"use client"
import { signupSchema } from '@/app/schema/signupSchema';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Signup = () => {
    const { data: session, status } = useSession()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()


    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({})

        const trimmedData = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
        }


        const signupValidation = signupSchema.safeParse(trimmedData)
        if (!signupValidation.success) {
            const newErrors = {};
            signupValidation.error.errors.forEach(err => {
                newErrors[err.path[0]] = err.message;
            })
            setError(newErrors)
            return;
        }

        try {
            const userExists = await axios.post("/api/userExists", { email: trimmedData.email })
            const { user } = await userExists.data;
            if (user) {
                setError((prev) => ({ ...prev, email: "User alredy exists" }))
                return;
            }

            const res = await axios.post("/api/register", trimmedData)
            if (res.status === 201) {
                const form = e.target;
                form.reset();
                toast.success("Signup Successfully 🎉")
                router.push("/auth/login")
            } else {
                // console.log("User Registration Failed")
                setError((prev) => ({ ...prev, general: "User regestration failed" }))
            }
        } catch (error) {
            console.log(error)
        }

        return;
    }

    return (
        <div className='grid place-items-center h-screen' >
            <div className=' shadow-lg p-6 rounded-lg border-1 flex justify-center  flex-col gap-5 w-70 items-start ' >
                <div>
                    <h2 className='font-bold text-2xl text-green-400' >SignUp</h2>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col  gap-2' >
                    <input
                        type="text"
                        placeholder='Enter Your Full Name'
                        className='border-1 h-7 w-57.5 rounded-sm ps-2 font-medium text-sm'
                        onChange={e => setName(e.target.value)}
                    />
                    {error.name && <p className='text-red-500 text-xs' >{error.name}</p>}
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
                    {error.password && <p className='text-red-500 text-xs ' >{error.password}</p>}

                    <button className='bg-green-400 text-lg font-bold text-white px-4 py-1 rounded-lg mt-3 w-57.5 ' >SignUp</button>
                </form>
                <div>
                    <div>
                        {error.general && (
                            <p className='font-bold text-xs rounded-sm bg-red-600 text-white px-2 py-0.5 w-36 ' >{error.general}</p>
                        )
                        }
                    </div>
                    <Link href={'/auth/login'}>alredy have a account? <span className='underline' >login</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
