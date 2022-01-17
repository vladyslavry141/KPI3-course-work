import { useAppSelector } from 'app/hook';
import { selectAccount } from 'app/reducer/account';
import { Navigate } from 'react-router-dom';

// const { auth } = metaApi;

export interface PrivateRouteProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export const PrivateRoute = ({
  redirectTo = '/login',
  children,
}: PrivateRouteProps) => {
  const account = useAppSelector(selectAccount);
  return account.status === 'logged' ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} />
  );
};
