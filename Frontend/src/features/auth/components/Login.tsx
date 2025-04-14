import { useState } from 'react';
// import { OAuthProvider  } from 'appwrite';
import { Link } from 'react-router-dom';
import config from '../../../config/config';
import { login } from '../../../redux/auth/authAction';    
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStore, AppDispatch } from '../../../redux/store';
import { AddressIcon, EyeSlashIcon, GoogleIcon } from '../../../assets/images/icons/icons';
import { Footer } from '../../../components/layout/Footer';
// import { account } from '../../../services/OAuth/appWrite';
// import { oauthLogin } from '../../../redux/auth/authAction';
import { handleLoginGoogle } from '../../../auth/GoogleLoginButton';

export const Login:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { error } = useSelector((state: RootStore) => state.auth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // const { handleLoginWithGoogle } = useGoogleLogin();

    const navigate = useNavigate();
    
    // Handle Form submit events
    const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({ email, password }))
            .then(() => console.log("Login action dispatched"))
            .catch((error) => console.log("Error dispatching login action: ", error))

        navigate('/');
    };

    // Handle Login with Goolge 
    // const handleLoginWithGoogle = async () =>{
    //     try {
    //         const success = 'http://localhost:5173/profile'; // URL to redirect on success
    //         const failure = 'http://localhost:5173/login'; // URL to redirect on failure
  
    //         account.createOAuth2Session(OAuthProvider.Google, success, failure);

    //         // Get current session after successful login
    //         const session = await account.getSession('current');
    //         if (session) {
    //             const user = await account.get();

    //             console.log('Tên người dùng:', user.name); 

    //             const response = await dispatch(oauthLogin(user)).unwrap();
    //             console.log('Logged in with Google: ', response);

    //             // Save the token in LocalStorage
    //             if (response && response.token) {
    //                 localStorage.setItem('authToken', response.token);
    //                 // Redirect 
    //                 navigate('/profile');
    //             }

    //         } else {
    //             console.log('No session after Google login');}
    //     }
    //     catch(error) {
    //         console.error('Google login failed: ', error);
    //     }
    // }

    return (
        <div className='flex flex-col min-h-screen mt-30'>
            <main className='flex-grow min-h-screen'>
                <div className='flex flex-col items-center justify-center min-h-screen w-full'>
                    <div
                        className='bg-white w-[328px] mt-90 mb-5 border border-[#1a1a1a] uppercase flex items-center justify-center h-[56px] text-black cursor-pointer text-center p-[10px] font-[GucciSansPro-medium]'
                        onClick={handleLoginGoogle}
                    >
                        <button type='button' className='uppercase cursor-pointer flex items-center gap-10'>
                            <GoogleIcon />
                            Continue with Google
                        </button>
                    </div>
                    <form action="" onSubmit={handleFormSubmit} className='flex flex-col items-center p-10 mt-[20px]'>
                        <h3 className='text-black text-center uppercase text-3xl mb-30 font-[GucciSansPro-book]'>
                            Continue with your email address
                        </h3>
                        <div className='relative flex flex-col mb-[50px] max-w-[450px]'>
                            <input 
                                className='peer font-[GucciSansPro-light] text-sm text-[#666] bg-white h-[56px] w-[328px] p-[10px] border border-solid border-[#1b1b1b]'
                                type="text" 
                                placeholder=" " 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />  
                            <label
                                htmlFor="email"
                                className="absolute left-[10px] font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
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
                                className='peer font-[GucciSansPro-light] flex items-center text-sm text-[#666] h-[56px] w-[328px] bg-white p-[10px] border border-solid border-[#1b1b1b]'
                                type="text"  
                                placeholder=" " 
                                id="password" 
                                value={password.toString()}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-[10px] font-[GucciSansPro-light] uppercase top-1/2 -translate-y-1/2 text-sm text-[#666] transition-all 
                                    peer-placeholder-shown:top-1/2 
                                    peer-placeholder-shown:text-sm 
                                    peer-placeholder-shown:text-[#666] 
                                    peer-focus:top-[14px] peer-focus:text-xs peer-focus:text-[#666]
                                    peer-not-placeholder-shown:top-[14px] peer-not-placeholder-shown:text-xs"
                            >password*</label>
                            <span className='w-[15px] absolute bottom-[35%] right-[20px]'>
                                <EyeSlashIcon />
                            </span>
                        </div>
                        <div className='w-[328px] flex flex-col items-center p-10 mb-[20px]'>
                            <p className='text-justify font-[GucciSansPro-light] text-[#666] text-sm'>
                                By choosing "Create my profile", you confirm that you agree to our 
                                <a href="#" className='text-[#000] underline underline-offset-1 pl-2 font-[GucciSansPro-medium]'>Terms of use</a> , that you have acknowledged our 
                                <a href="#" className='text-[#000] underline underline-offset-1 pl-2 font-[GucciSansPro-medium]'>privacy policy</a> , and that you want to create your GUCCI profile.
                            </p>
                        </div>
                        <div className='bg-[#1a1a1a] w-[328px] uppercase flex items-center justify-center h-[56px] text-white cursor-pointer text-center p-[10px] font-[GucciSansPro-medium]'>
                            <button type='submit' className='uppercase cursor-pointer'>sign in</button>
                        </div>
                        <span className='font-[GucciSansPro-book] uppercase my-10 text-xl'>or</span>
                        <div className='bg-[#1a1a1a] w-[328px] uppercase flex items-center justify-center h-[56px] text-white cursor-pointer text-center p-[10px] font-[GucciSansPro-medium]'>
                            <Link to={config.routes.register}>
                                <button className='uppercase cursor-pointer'>sign up</button>
                            </Link>
                        </div>
                        
                        {error && <p className='text-red-500'>{error}</p>}
                    </form>
                </div>
                <div className='pb-[70px] text-center flex flex-col items-center'>
                    <h2 className=' font-[GucciSansPro-book] text-[30px] text-[#000] mb-[32px]'>JOIN MY COZASTORE</h2>
                    <div>
                        <div className='grid grid-cols-3 gap-6'>
                            <div className='max-w-[380px] px-[36px]'>
                                <h3 className=' font-[GucciSansPro-bold] mb-12 text-[#000]'>TRACK YOUR ORDERS</h3>
                                <p className=' font-[GucciSansPro-light]'>Follow your orders every step of the way.</p>
                            </div>
                            <div className='max-w-[380px] px-[36px]'>
                                <h3 className=' font-[GucciSansPro-bold] mb-12 text-[#000]'>STREAMLINE CHECKOUT</h3>
                                <p className=' font-[GucciSansPro-light]'>Check out faster with saved addresses and payment methods.</p>
                            </div>
                            <div className='max-w-[380px] px-[36px]'>
                                <h3 className=' font-[GucciSansPro-bold] mb-12 text-[#000]'>BOOK AN APPOINTMENT</h3>
                                <p className=' font-[GucciSansPro-light]'>Enjoy priority access to the boutique of your choice at the time and date that suits you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
};