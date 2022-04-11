import React from 'react'
import { Group, UnstyledButton,Text,Avatar, Button } from '@mantine/core';
import useStyles from './Layout.styles';
import axios from 'axios';

type UserProps = {
  image: string,
  name: string,
  email: string,
  onClick:Function
}

const User: React.FC<UserProps> = ({image,name,email,onClick}): JSX.Element => {
  console.log("🚀 ~ file: User.tsx ~ line 23 ~ .finally ~ window.location.host", window.location.host)
  const { classes, cx } = useStyles();
 
  const onSignOut = () => {
    axios
      .get(`${import.meta.env.VITE_API}/auth/signout`, {
        withCredentials: true,
      })
      .finally(() => {
        window.location.href = `${window.location.origin}/login`;
      });
  }

  return (
    <div onClick={onClick} className={classes.user}>
      <Group>
        <Avatar src={`${image}`} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text align="left" size="sm" weight={500}>
            {name}
          </Text>
          <Text align="left" color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
      <Button onClick={onSignOut} mt={20} variant="light" style={{ width: '100%' }}>
        Sign Out
      </Button>
    </div>
  );
}

export default User