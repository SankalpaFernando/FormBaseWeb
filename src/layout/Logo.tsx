// @ts-nocheck

import { Group, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

type LogoProps = {
  style?:Object
}

const Logo: React.FC<LogoProps> = ({style}) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <Group position="apart">
        <Text size="xl" style={{ fontFamily: 'Montserrat Alternates',...style }}>
          <span
            style={
              {
                // color: theme.colors.green[5],
                // fontSize: '2rem',
                // fontWeight: 'bold',
              }
            }
          >
            F
          </span>
          ORMBASE
        </Text>
      </Group>
    </div>
  );
};

export default Logo;
