import React, { Suspense } from 'react'
import ResetPassword from '@/components/authPages/ResetPassword'

export default function TokenPage(){
    return (
        <Suspense fallback={<p>loading...</p>}>
            <ResetPassword />
        </Suspense>
    )
}
