// @ts-nocheck

import React, { useState } from 'react';
import { Alert, Box, Button, Input, Text } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import Logo from '../../layout/Logo';
import { Links } from './Links';
import { useNavigate } from 'react-router';
const Docs: React.FC = () => {
  const [component, setComponent] = useState<React.FC>(Links[0].component);
  const [selected, setSelected] = useState(0);
  const [parentId, setParentID] = useState<number | undefined>(0);

  const navigate = useNavigate();

  return (
    <>
      <div style={{ width: '50%', margin: '0 auto 0 28%' }}>
        <Box mt={20}>
          <Logo style={{ fontSize: '2.5rem' }} />
        </Box>
        <div style={{ width: '100%', margin: 'auto' }}></div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 6fr 2fr',
          width: '90%',
          gap: '3rem',
          margin: '2rem 1rem 0 auto',
        }}
      >
        <div>
          {Links.map((link, index) =>
            link.type === 'Header' ? (
              <HeaderLink
                {...link}
                selected={
                  link.headerID
                    ? parentId === link.headerID
                    : selected === index + 1
                }
                onClick={() => {
                  setComponent(link.component);
                  setSelected(index + 1);
                  setParentID(0);
                }}
              />
            ) : (
              <Link
                {...link}
                selected={selected === index + 1}
                onClick={() => {
                  setComponent(link.component);
                  setSelected(index + 1);
                  setParentID(link.parentID);
                }}
              />
            )
          )}
        </div>

        <div>{component}</div>
        <div style={{ width: '90%', margin: '.2rem 0 0 auto' }}>
          <div style={{ padding: '1rem 1.8rem' }}>
            <Text align="left" size="xl" mb={10} weight="500">
              Interested!
            </Text>
            <Text align="left" color="gray">
              Let's get started by creating an Account for you.
            </Text>
            <div
              style={{
                display: 'flex',
                marginTop: '1rem',
                justifyContent: 'left',
              }}
            >
              <Button variant="light" onClick={() => navigate('/')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type LinksProps = {
  name: string;
  onClick: Function;
  selected: boolean;
};

const Link: React.FC<LinksProps> = ({ name, onClick, selected }) => {
  return (
    <Text
      style={selected ? { fontWeight: '500' } : { fontWeight: 'normal' }}
      sx={{ '&:hover': { fontWeight: '500', cursor: 'pointer' } }}
      ml={20}
      my={5}
      onClick={onClick}
      align="left"
    >
      {name}
    </Text>
  );
};

const HeaderLink: React.FC<LinksProps> = ({ name, onClick, selected }) => {
  return (
    <Text
      style={selected ? { fontWeight: '500' } : { fontWeight: 'normal' }}
      sx={{ '&:hover': { fontWeight: '500', cursor: 'pointer' } }}
      my={5}
      onClick={onClick}
      align="left"
    >
      {name}
    </Text>
  );
};

export default Docs;
