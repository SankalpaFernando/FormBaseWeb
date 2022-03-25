import { Text,TypographyStylesProvider } from '@mantine/core';
import { isUndefined } from 'lodash';
import React from 'react'
import { useNavigate } from 'react-router';

type HeaderProps = {
  title: string;
  link?: {
    text: string;
    id: string;
  }
}

const Header: React.FC<HeaderProps> = ({ title, link }) => {
  const navigate = useNavigate();
  return (
    <Text size="xl" align="left" mb={4}>
      <TypographyStylesProvider>
        <h2
          style={{
            fontFamily: 'Fredoka',
            fontWeight: 'lighter',
            display: 'flex',
            gap: '.5rem',
          }}
        >
          { !isUndefined(link) &&  <Text
            style={{ fontSize: '24px' }}
            size="xl"
            sx={(theme) => ({
              color: theme.colors[theme.primaryColor][8],
              '&:hover': {
                cursor: 'pointer',
              },
            })}
            onClick={()=>navigate(`/projects/${link.id}`)}
          >
            {link?.text} /
          </Text>}
          <Text style={{ fontSize: '24px' }}> {title}</Text>
        </h2>
      </TypographyStylesProvider>
    </Text>
  );
}

export default Header