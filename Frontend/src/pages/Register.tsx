import { useState } from 'react';
import { register } from '../redux/auth/authAction';    
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStore, AppDispatch } from '../redux/store';
import { AddressIcon, EyeSlashIcon } from '../assets/images/icons/icons';
import images from '../assets/images/images';

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
            .then(() => console.log("Login action dispatched"))
            .catch((error) => console.log("Error dispatching login action: ", error))

        navigate('/login');
    };

    return (
        <>
            <div className='absolute top-[60%] left-[47%] transform -translate-x-1/2 -translate-y-1/2 w-[auto]'>
                <form action="" onSubmit={handleFormSubmit} className='flex flex-col items-center p-10 mt-[20px]'>
                    <h3 className='text-black text-center uppercase text-3xl mb-30 font font-[GucciSansPro-book]'>
                        Continue with your email address
                    </h3>
                    <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                        <label htmlFor="name" className='mb-[10px] text-[#838383] text-xs font font-[GucciSansPro-light]'>*Required field</label>
                        <input 
                            className='peer font font-[GucciSansPro-light] uppercase text-sm text-[#666] bg-white h-[56px] w-[328px] p-[10px] border border-solid border-[#1b1b1b]'
                            type="text" 
                            placeholder="" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />  
                        <label
                            htmlFor="name"
                            className="absolute left-[10px] font font-[GucciSansPro-light] uppercase -translate-y-1/2 text-sm text-[#666] transition-all peer-placeholder-shown:top-[65%] peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#666] peer-focus:top-[40px] peer-focus:text-xs peer-focus:text-[#666]"
                        >username*</label>
                        <span className='w-[15px] absolute top-[59%] right-[20px]'>
                            <img src={images.pencilIcon} alt="pencilIcon" />
                        </span>
                    </div>
                    <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                        <input 
                            className='peer font font-[GucciSansPro-light] uppercase text-sm text-[#666] bg-white h-[56px] w-[328px] p-[10px] border border-solid border-[#1b1b1b]'
                            type="text" 
                            placeholder="" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />  
                        <label
                            htmlFor="email"
                            className="absolute left-[10px] font font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#666] peer-focus:top-[13px] peer-focus:text-xs peer-focus:text-[#666]"
                        >email*</label>
                        <span className='w-[15px] absolute top-[39%] right-[20px]'>
                            <AddressIcon />
                        </span>
                    </div>

                    <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                        <input 
                            className='peer font font-[GucciSansPro-light] flex items-center uppercase text-sm text-[#666] h-[56px] w-[328px] bg-white p-[10px] border border-solid border-[#1b1b1b]'
                            type="text" 
                            placeholder="" 
                            id="password" 
                            value={password.toString()}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-[10px] font font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#666] peer-focus:top-[14px] peer-focus:text-xs peer-focus:text-[#666]"
                        >create password*</label>
                        <span className='w-[15px] absolute bottom-[35%] right-[20px]'>
                            <EyeSlashIcon />
                        </span>
                    </div>
                    
                    <div className='bg-[#1a1a1a] w-[328px] uppercase flex items-center justify-center h-[56px] text-white cursor-pointer text-center p-[10px] font font-[GucciSansPro-medium]'>
                        <button type='submit' className='uppercase'>create my profile</button>
                    </div>
                    
                    <span className='text-center pt-30 w-[450px] text-[#b2b2b2] font font-[Poppins-regular]'>© {new Date().getFullYear()} COZA STORE. All rights reserved.</span>
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
            </div>
        </>
    )
};