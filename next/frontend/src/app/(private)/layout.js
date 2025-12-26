import GuestRoute from '@/components/protaction/GuestRoute'
import ProtectedRoute from '@/components/protaction/ProtectedRoute'
import React from 'react'

function layout({children}) {
  return (
    <ProtectedRoute>{children}</ProtectedRoute>
  )
}

export default layout