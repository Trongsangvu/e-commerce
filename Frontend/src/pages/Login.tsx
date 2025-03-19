import { useState } from 'react';
import { login } from '../redux/auth/authAction';    
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, AppDispatch } from '../redux/store';
import { AddressIcon, EyeSlashIcon } from '../assets/images/icons/icons';

export const Login:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { error } = useSelector((state: RootStore) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({ email, password }))
            .then(() => console.log("Login action dispatched"))
            .catch((error) => console.log("Error dispatching login action: ", error))
    };

    return (
        <>
            <div className='absolute top-[60%] left-[47%] transform -translate-x-1/2 -translate-y-1/2 w-[450px]'>
                <form action="" onSubmit={handleFormSubmit} className='flex flex-col p-10 mt-[20px]'>
                    <h3 className='text-black text-center text-4xl font-semibold'>Login</h3>
                    <div className='relative flex flex-col mb-[20px]'>
                        <label htmlFor="email" className='mb-[10px]'>Email Address</label>
                        <input 
                            className='text-black bg-[#f8f8f6] w-auto rounded-xl p-[10px]'
                            type="text" 
                            placeholder="Your Email Address" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />  
                        <span className='w-[15px] absolute top-[63%] right-[20px]'>
                            <AddressIcon />
                        </span>
                    </div>

                    <div className='relative flex flex-col mb-[20px]'>
                        <label className='mb-[10px]' htmlFor="password">Password</label>
                        <input 
                            className='text-black w-auto bg-[#f8f8f6] rounded-xl p-[10px]'
                            type="text" 
                            placeholder="Your Password" 
                            id="password" 
                            value={password.toString()}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className='w-[15px] absolute bottom-[20%] right-[20px]'>
                            <EyeSlashIcon />
                        </span>
                    </div>
                    
                    <div className='flex justify-between mb-[30px]'>
                        <span className='capitalize font-normal text-[#a1a1a1]'>remember me</span>
                        <span className='capitalize text-[#e65540] font-medium cursor-pointer'>forgot password?</span>
                    </div>

                    <div className='bg-[#e65540] text-white rounded-xl cursor-pointer text-center w-auto p-[10px] font-medium'>
                        <button type='submit'>Sign in</button>
                    </div>
                    <span className='text-center text-[#767676] mt-[20px]'>Or continue with</span>

                    <div className='flex justify-between gap-[30px] m-[20px]'>
                        <div className='border border-[#dddddd] rounded-xl text-center w-[280px] cursor-pointer p-[10px]'>
                            <a href="#">
                                <button className='capitalize cursor-pointer '>google</button>
                            </a>
                        </div>
                        <div className='border border-[#dddddd] rounded-xl text-center w-[280px] cursor-pointer p-[10px]'>
                            <a href="#">
                                <button className='capitalize cursor-pointer '>facebook</button>
                            </a>
                        </div>
                    </div>
                    <span className='text-center mb-[50px]'>Don't have an account? Sign up now</span>
                    <span className='text-center text-[#bebebe]'>© 2023 COZA STORE. All rights reserved.</span>
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
            </div>
        </>
    )
};