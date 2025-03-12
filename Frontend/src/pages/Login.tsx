import { useState } from 'react';
import { ILogin } from '../model/Auth';
import { login } from '../services/authService';    

export const Login:React.FC = () => {
    const [data, setData] = useState<ILogin>({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: id === 'password' ? String(value) : value });
    };

    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.email === "" && data.password === "") {
            alert("Please enter email and password");
            return;
        }

        try {
            const result = await login(data);

            if(result.status == 200) {
                // Token
                console.log(result);
            }
        } catch(error) {
            console.error('Login failed:', error);
        }
    }

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
                        value={data.email}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        placeholder="Password" 
                        id="password" 
                        value={data.password}
                        onChange={handleInputChange}    
                    />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </>
    )
}