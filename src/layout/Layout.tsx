import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Layout: React.FC = ({ children }): JSX.Element => {
  const { photo, email, name } = useSelector((state: RootState) => state.route.currentUser);
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
                <User
                  onClick={()=>setPopOverOpen(!popOverOpen)}
                  image={photo}
                  name={name}
                  email={email}
                />
              
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
