import { UseAuthentication } from '@/components/auth/authProvider';
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user } = UseAuthentication();
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}