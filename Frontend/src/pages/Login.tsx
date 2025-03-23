import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config/config';
import { login } from '../redux/auth/authAction';    
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStore, AppDispatch } from '../redux/store';
import { AddressIcon, EyeSlashIcon } from '../assets/images/icons/icons';

export const Login:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { error } = useSelector((state: RootStore) => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Handle Form submit events
    const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({ email, password }))
            .then(() => console.log("Login action dispatched"))
            .catch((error) => console.log("Error dispatching login action: ", error))

        navigate('/');
    };

    return (
        <div className='flex flex-col min-h-screen mt-30'>
            <main className='flex-grow min-h-screen'>
                <div className='flex flex-col items-center justify-center min-h-screen w-full'>
                    <form action="" onSubmit={handleFormSubmit} className='flex flex-col items-center p-10 mt-[20px]'>
                        <h3 className='text-black text-center text-4xl font font-[GucciSansPro-book]'>CONTINUE WITH EMAILL ADDRESS</h3>
                        <div className='relative flex flex-col mb-[20px] max-w-[450px]'>
                            <label htmlFor="email" className='mb-[10px]'>Email Address</label>
                            <input 
                                className='text-black w-[328px] h-[56px] bg-white p-[10px] border border-solid border-[#1b1b1b]'
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

                        <div className='relative flex flex-col mb-[20px] max-w-[450px]'>
                            <label className='mb-[10px]' htmlFor="password">Password</label>
                            <input 
                                className='text-black w-[328px] h-[56px] bg-white p-[10px] border border-solid border-[#1b1b1b]'
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
                            <div className='hover:bg-[#6774d5] hover:text-[white] border border-[#dddddd] rounded-xl text-center w-[280px] cursor-pointer p-[10px]'>
                                <a href="#">
                                    <button className='capitalize cursor-pointer '>google</button>
                                </a>
                            </div>
                            <div className='hover:bg-[#6774d5] hover:text-[white] border border-[#dddddd] rounded-xl text-center w-[280px] cursor-pointer p-[10px]'>
                                <a href="#">
                                    <button className='capitalize cursor-pointer'>facebook</button>
                                </a>
                            </div>
                        </div>
                        <span className='text-center mb-[50px] font font-[Poppins-regular]'>Don't have an account? 
                            <Link to={config.routes.register}>
                                <span className='pl-5 underline underline-offset-4'>Sign up now</span>
                            </Link>
                        </span>
                        <span className='text-center text-[#b2b2b2] font font-[Poppins-regular]'>© {new Date().getFullYear()} COZA STORE. All rights reserved.</span>
                        {error && <p className='text-red-500'>{error}</p>}
                    </form>
                </div>
            </main>
        </div>
    )
};