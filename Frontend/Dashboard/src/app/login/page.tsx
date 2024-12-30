'use client'
import React, { useState } from 'react'
import TextInput from '../components/general/text_input'
import Form from 'next/form'
import CustomButton from '../components/general/custom_button'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = () => {

    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="bg-white py-8 shadow-xl px-8 rounded-lg flex flex-col gap-6 sm:w-full sm:m-5 md:w-1/2 lg:w-1/3">
                <h2 className='font-bold text-2xl'>
                    Login
                </h2>
                <Form action={handleFormSubmit}
                    className='flex flex-col gap-6 mt-5'>
                    <TextInput
                        value={username}
                        onChange={e => setUsername(e.currentTarget.value)}
                        placeholder='Username'
                    />
                    <TextInput
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.currentTarget.value)}
                        placeholder='Password'
                    />
                    <div
                        className="w-full flex justify-end font-bold text-sm text-primary hover:text-tertiary"
                    >
                        <a href="#">Forgot password?</a>
                    </div>
                    <CustomButton
                        additionalClass='mt-5 text-white bg-secondary'
                    >
                        Continue
                    </CustomButton>
                </Form>
            </div>
        </div>
    )
}

export default Login