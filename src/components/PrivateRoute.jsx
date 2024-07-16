import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../app/zustandStore';

const PrivateRoute = () => {
  const { user } = useUserStore((state) => state);
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;