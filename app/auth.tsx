'use client'

import React, { use, useCallback, useState } from 'react'
import Input from './components/Input'
import axios from 'axios';
import { signIn } from 'next-auth/react'

const Auth = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [toggle, setToggle] = useState('login');

    // {login or register}
    const toggleUser = useCallback(() => {
        setToggle((currentUser) => currentUser === 'login' ? 'register' : 'login')
    }, []);

    // {callback}
    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });

        } catch (error) {
            console.log(error);
        }
    }, [email, name, password]);

    const login = useCallback(async () => {

        try {
            await signIn('cendentials')
        } catch (error) {
            console.log(error)
        }

    }, [email, password]);


    return (
        <div className='flex justify-center items-center mt-10 '>
            <div className=' px-16 self-center justify-center items-center'>
                <img src="/user.png" alt="logo" className='h-12 mx-auto' />
                <div>
                    <h2 className='flex  justify-center items-center text-black text-2xl mb-4 font-semibold ' >
                        {toggle === 'login' ? 'Sign in' : 'Register'}
                    </h2>

                    <div className='flex flex-col gap-4 '>
                        {toggle === 'register' && (
                            <Input
                                label='Username'
                                onChange={(e: any) => setName(e.target.value)}
                                id='name'
                                value={name}
                            />
                        )}
                        <Input
                            label='Email'
                            onChange={(e: any) => setEmail(e.target.value)}
                            id='email'
                            type='email'
                            value={email}
                        />
                        <Input
                            label='Password '
                            onChange={(e: any) => setPassword(e.target.value)}
                            id='password'
                            type='password'
                            value={password}
                        />
                    </div>
                    <button onClick={toggle === 'login' ? login : register}
                        className='flex mx-auto mt-4 bg-red-500 text-white rounded-md w-md'>
                        {toggle === 'login' ? 'Sign in' : 'Register'}
                    </button>
                    <p className='text-neutral-500 mt-2'>
                        <span onClick={toggleUser} className='text-black cursor-pointer flex items-center justify-center'>
                            {toggle === 'login' ? 'Create account 👈' : 'Login click 👈 '}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Auth
