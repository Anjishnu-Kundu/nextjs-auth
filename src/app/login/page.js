'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://140.82.1.20:3000/api/agent/auth', {
                email,
                password,
            });

            console.log(response);

            const { token, userDetails } = response.data;

            console.log(token, userDetails);

            localStorage.setItem('token', token);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            router.push('/dashboard');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const login = async() => {
        console.log(email, password);
        let item = {email, password}

        let result = await fetch("http://localhost:3001/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
    }

    return (
        <div className="login-container">
            <h2 className="font-bold text-xl">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={login} type="submit">Login</button>
            </form>
            <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: auto;
          padding: 2rem;
          border: 1px solid #ccc;
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 1rem;
        }
        .input-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
        </div>
    );
}
