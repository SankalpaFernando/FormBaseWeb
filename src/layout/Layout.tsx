import React from 'react';
import {
  AppShell,
  Navbar,
  Avatar,
} from '@mantine/core';
import MainLink from './MainLink';
import links from './links';
import User from './User';
import Logo from './Logo';

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <AppShell
      fixed
      navbar={
        <Navbar hidden={true} padding="md"  hiddenBreakpoint="md" width={{ sm: 300, lg: 300 }}>
          <Navbar.Section mt="xs">
            <Logo />
          </Navbar.Section>

          <Navbar.Section grow mt="lg">
            {links.map(({ icon, label,href }) => (
              <MainLink Icon={icon} label={label} href={href}/>
            ))}
          </Navbar.Section>
          <Navbar.Section>
            <User
              image="https://lh3.googleusercontent.com/a/AATXAJx_kmtFj_bOcK9Itw57i0G0FR4FM96qsfJIdvna=s96-c"
              name="Sankalpa Fernando"
              email="sankalpafernando2017@gmail.com"
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
