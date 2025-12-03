'use client'
import React, { useState } from 'react'
import TextInput from '../components/general/text_input'
import Form from 'next/form'
import CustomButton from '../components/general/custom_button'
import { LOGIN_PASSWORD, LOGIN_USER } from '../constants/consts'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleFormSubmit = () => {
        if (username === LOGIN_USER && password === LOGIN_PASSWORD) {
            setError(false)
            document.cookie = `user=${username}; Path=/; Max-Age=${60 * 15}`;
            router.push('/dashboard')
        } else setError(true)
    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="bg-white py-8 shadow-xl px-8 rounded-lg flex flex-col gap-6 sm:w-full sm:m-5 md:w-1/2 lg:w-1/3">
                <h2 className='font-bold text-2xl'>
                    Login
                </h2>
                {error && <div className="w-full text-red-500 text-sm">Invalid credentials!</div>}
                <Form action={handleFormSubmit}
                    className='flex flex-col gap-6 mt-5'>
                    <TextInput
                        value={username}
                        onChange={e => setUsername(e.currentTarget.value)}
                        placeholder='Username'
                        required={true}
                    />
                    <TextInput
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.currentTarget.value)}
                        placeholder='Password'
                        required={true}
                    />
                    <div
                        className="w-full flex justify-end font-bold text-sm text-primary hover:text-tertiary"
                    >
                        <a href="#">Forgot password?</a>
                    </div>
                    <CustomButton
                        additionalClass='mt-5 text-white bg-secondary'
                        type='submit'
                    >
                        Continue
                    </CustomButton>
                </Form>
            </div>
        </div>
    )
}

export default Login