import { useState } from 'react';
import { login } from '../redux/auth/authAction';    
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, AppDispatch } from '../redux/store';

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
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-indigo-500'>
                <form action="" onSubmit={handleFormSubmit} className='flex flex-col p-10'>
                    <h3 className='text-black'>Login here</h3>
                    <label htmlFor="email">Email</label>
                    <input 
                        className='text-black w-xs'
                        type="text" 
                        placeholder="Email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        placeholder="Password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Login</button>
                    {error && <p className='text-red-500'>{error}</p>}
                </form>
            </div>
        </>
    )
};