'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userDetailsString = localStorage.getItem('userDetails');

        if (!token || !userDetails) {
            router.push('/login');
        } else {
            try {
                const userDetails = JSON.parse(userDetailsString);
                setUserDetails(userDetails);
            } catch (error) {
                console.error('Failed to parse user details:', error);
                router.push('/login');
            }
        }
    }, [router]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.name}</p>
        </div>
    );
}