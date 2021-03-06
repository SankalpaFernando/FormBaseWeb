// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  AppShell,
  Navbar,
  Avatar,
  Popover,
  Card,
  Button,
  Text,
} from '@mantine/core';
import MainLink from './MainLink';
import links from './links';
import User from './User';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCurrentUser, setIsAuthenticated } from '../redux/reducer/routes';
import { isEmpty } from 'lodash';

const Layout: React.FC = ({ children }): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/auth/user`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        dispatch(setCurrentUser({ ...data }));
        if (!isEmpty(data.name)) {
          dispatch(setIsAuthenticated(true));
          navigate("/");
        }
      });
  }, []);
  const currentUser = useSelector((state: RootState) => state.route.currentUser);
  const [popOverOpen, setPopOverOpen] = useState(false);
  return (
    <AppShell
      fixed
      navbar={
        <Navbar
          hidden={true}
          padding="md"
          hiddenBreakpoint="md"
          width={{ sm: 300, lg: 300 }}
        >
          <Navbar.Section mt="xs">
            <Logo />
          </Navbar.Section>

          <Navbar.Section grow mt="lg">
            {links.map(({ icon, label, href }) => (
              <MainLink Icon={icon} label={label} href={href} />
            ))}
          </Navbar.Section>
          <Navbar.Section>
            {currentUser !== null && (
              <User
                onClick={() => setPopOverOpen(!popOverOpen)}
                image={currentUser.photo}
                name={currentUser.name}
                email={currentUser.email}
              />
            )}
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
