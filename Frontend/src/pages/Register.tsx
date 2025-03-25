import { useState } from 'react';
import { register } from '../redux/auth/authAction';    
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStore, AppDispatch } from '../redux/store';
import { AddressIcon, EyeSlashIcon } from '../assets/images/icons/icons';
import images from '../assets/images/images';
import { Footer } from '../components/layout/Footer';

export const Register:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { error } = useSelector((state: RootStore) => state.auth);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Handle Form submit events
    const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register({ name, email, password }))
            .then(() => console.log("Register action dispatched"))
            .catch((error) => console.log("Error dispatching register action: ", error))

        navigate('/login');
    };

    return (
        <div className='flex flex-col min-h-screen mt-30'>
            <main className='flex-grow min-h-screen'>
                <div className='flex flex-col items-center justify-center min-h-screen w-full'>
                    <form action="" onSubmit={handleFormSubmit} className='flex flex-col items-center p-10 mt-[20px]'>
                        <h3 className='text-black text-center uppercase text-3xl mb-30 font font-[GucciSansPro-book]'>
                            Continue with your email address
                        </h3>
                        <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                            <label htmlFor="name" className='mb-[10px] text-[#838383] text-xs font font-[GucciSansPro-light]'>*Required field</label>
                            <input 
                                className='peer font font-[GucciSansPro-light] text-sm text-[#666] bg-white h-[56px] w-[328px] p-[10px] border border-solid border-[#1b1b1b]'
                                type="text" 
                                placeholder=" " 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />  
                            <label
                                htmlFor="name"
                                className="absolute left-[10px] font font-[GucciSansPro-light] uppercase top-[5%] -translate-y-[5%] text-sm text-[#666] transition-all
                                    peer-placeholder-shown:top-1/2
                                    peer-placeholder-shown:text-sm 
                                    peer-placeholder-shown:text-[#666] 
                                    peer-focus:top-[32px] peer-focus:text-xs peer-focus:text-[#666]
                                    peer-not-placeholder-shown:top-[32px] peer-not-placeholder-shown:text-xs"
                            >username*</label>
                            <span className='w-[15px] absolute top-[59%] right-[20px]'>
                                <img src={images.pencilIcon} alt="pencilIcon"/>    
                            </span>
                        </div>
                        <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                            <input 
                                className='peer font font-[GucciSansPro-light] text-sm text-[#666] bg-white h-[56px] w-[328px] p-[10px] border border-solid border-[#1b1b1b]'
                                type="text" 
                                placeholder=" " 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />  
                            <label
                                htmlFor="email"
                                className="absolute left-[10px] font font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                                        peer-placeholder-shown:top-1/2 
                                        peer-placeholder-shown:text-sm 
                                        peer-placeholder-shown:text-[#666] 
                                        peer-focus:top-[13px] peer-focus:text-xs peer-focus:text-[#666]
                                        peer-not-placeholder-shown:top-[13px] peer-not-placeholder-shown:text-xs"
                            >email*</label>
                            <span className='w-[15px] absolute top-[39%] right-[20px]'>
                                <AddressIcon />
                            </span>
                        </div>

                        <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                            <input 
                                className='peer font font-[GucciSansPro-light] flex items-center text-sm text-[#666] h-[56px] w-[328px] bg-white p-[10px] border border-solid border-[#1b1b1b]'
                                type="text"  
                                placeholder=" " 
                                id="password" 
                                value={password.toString()}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-[10px] font font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                                    peer-placeholder-shown:top-1/2 
                                    peer-placeholder-shown:text-sm 
                                    peer-placeholder-shown:text-[#666] 
                                    peer-focus:top-[14px] peer-focus:text-xs peer-focus:text-[#666]
                                    peer-not-placeholder-shown:top-[14px] peer-not-placeholder-shown:text-xs"
                            >create password*</label>
                            <span className='w-[15px] absolute bottom-[35%] right-[20px]'>
                                <EyeSlashIcon />
                            </span>
                        </div>
                        <div className='w-[328px] flex flex-col items-center p-10 mb-[20px]'>
                            <p className='text-justify font font-[GucciSansPro-light] text-[#666] text-sm'>
                                By choosing "Create my profile", you confirm that you agree to our 
                                <a href="#" className='text-[#000] underline underline-offset-1 pl-2 font font-[GucciSansPro-medium]'>Terms of use</a> , that you have acknowledged our 
                                <a href="#" className='text-[#000] underline underline-offset-1 pl-2 font font-[GucciSansPro-medium]'>privacy policy</a> , and that you want to create your GUCCI profile.
                            </p>
                        </div>
                        <div className='bg-[#1a1a1a] w-[328px] uppercase flex items-center justify-center h-[56px] text-white cursor-pointer text-center p-[10px] font font-[GucciSansPro-medium]'>
                            <button type='submit' className='uppercase cursor-pointer'>create my profile</button>
                        </div>
                        
                        {error && <p className='text-red-500'>{error}</p>}
                    </form>
                </div>
                <div className='pb-[70px] text-center flex flex-col items-center'>
                    <h2 className='font font-[GucciSansPro-book] text-[30px] text-[#000] mb-[32px]'>JOIN MY COZASTORE</h2>
                    <div>
                        <div className='grid grid-cols-3 gap-6'>
                            <div className='max-w-[380px] px-[36px]'>
                                <h3 className='font font-[GucciSansPro-bold] mb-12 text-[#000]'>TRACK YOUR ORDERS</h3>
                                <p className='font font-[GucciSansPro-light]'>Follow your orders every step of the way.</p>
                            </div>
                            <div className='max-w-[380px] px-[36px]'>
                                <h3 className='font font-[GucciSansPro-bold] mb-12 text-[#000]'>STREAMLINE CHECKOUT</h3>
                                <p className='font font-[GucciSansPro-light]'>Check out faster with saved addresses and payment methods.</p>
                            </div>
                            <div className='max-w-[380px] px-[36px]'>
                                <h3 className='font font-[GucciSansPro-bold] mb-12 text-[#000]'>BOOK AN APPOINTMENT</h3>
                                <p className='font font-[GucciSansPro-light]'>Enjoy priority access to the boutique of your choice at the time and date that suits you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
};