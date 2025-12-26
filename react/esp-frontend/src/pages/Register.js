import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [err,setErr]=useState('');
    const nav = useNavigate();

    const handle = async e => {
        e.preventDefault();
        setErr('');
        try{
            const res = await fetch('http://localhost:5000/api/auth/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (!res.ok) { setErr(data.message || 'Register failed'); return; }
            alert('Registered. Please login.');
            nav('/login');
        }catch(err){
            setErr('Server error');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handle}>
                <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
                <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {err && <p className="err">{err}</p>}
            <p>Already have account? <a href="/login">Login</a></p>
        </div>
    );
}
