import PasswordResetRequest from '@/components/authPages/PasswordResetRequest'
import React, { Suspense } from 'react'

function LoginPage() {
    return (
        <Suspense fallback={<><p>loading----</p></>}>
                <PasswordResetRequest />
        </Suspense>
    )
}

export default LoginPage
