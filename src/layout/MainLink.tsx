// @ts-nocheck

import React from 'react';
import { Group, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import useStyles from './Layout.styles';
import { useNavigate } from 'react-router-dom';
type MainLinkProps = {
  Icon: React.FC;
  label: string;
  href: string;
};

const MainLink: React.FC<MainLinkProps> = ({
  Icon,
  label,
  href = '/',
}): JSX.Element => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const onLinkClick = () => {
    navigate(href);
  };

  return (
    <UnstyledButton className={classes.button} onClick={onLinkClick}>
      <Group>
        <ThemeIcon style={{ height: 35, width: 35 }} variant="light">
          <Icon />
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default MainLink;
