import axios from 'axios';
import React, { ReactElement, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { setCurrentUser, setIsAuthenticated } from '../redux/reducer/routes';
import { RootState } from '../redux/store'

type AuthRouteProps = {
  children: ReactElement;
}


const AuthRoute: React.FC<AuthRouteProps> = ({children}) => {
  // const isAuthenticated = useSelector((state: RootState) => state.route.isAuthenticated);
  // if(!isAuthenticated) return (<Navigate to="/login" replace />);

  return children;

}

export default AuthRoute