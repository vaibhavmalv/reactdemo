import Login from '@/components/authPages/Login'
import React, { Suspense } from 'react'

function LoginPage() {
    return (
        <Suspense fallback={<><p>loading----</p></>}>
                <Login />
        </Suspense>
    )
}

export default LoginPage
