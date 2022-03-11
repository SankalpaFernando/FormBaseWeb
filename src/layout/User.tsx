import React from 'react'
import { Group, UnstyledButton,Text,Avatar } from '@mantine/core';
import useStyles from './Layout.styles';

type UserProps = {
  image: string,
  name: string,
  email:string,
}

const User: React.FC<UserProps> = ({image,name,email}): JSX.Element => {
  const { classes, cx } = useStyles();
  
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={`${image}`} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}

export default User