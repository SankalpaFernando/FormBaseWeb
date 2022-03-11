import { Text,TypographyStylesProvider } from '@mantine/core';
import React from 'react'

type HeaderProps = {
  title: string;
}

const Header:React.FC<HeaderProps>=({title})=>{
  return (
    <Text size="xl" align="left" mb={4}>
      <TypographyStylesProvider>
        <h1 style={{ fontFamily: 'Fredoka', fontWeight: 'lighter' }}>
          {title}
        </h1>
      </TypographyStylesProvider>
    </Text>
  );
}

export default Header