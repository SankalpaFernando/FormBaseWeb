// @ts-nocheck

import { Button, Card, Text } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentUser, setIsAuthenticated } from '../redux/reducer/routes';
import image from '../resources/bg.png';
const Login: React.FC = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const onAuth = () => {
    window.location.href = `${import.meta.env.VITE_API}/auth`;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: `url(${image})`,
      }}
    >
      <Card shadow="lg" padding="xl" style={{ padding: '4rem' }} radius="md">
        <Text size="xl" color="gray" m={20} align="left">
          {signUp
            ? 'New to Formbase ? Sign Up!'
            : 'Already Have an Account ? Sign In!'}
        </Text>
        <Button
          onClick={onAuth}
          size="lg"
          variant="light"
          fullWidth
          leftIcon={<FaGoogle />}
        >
          {signUp ? 'Sign Up with Google' : 'Sign In with Google'}
        </Button>
        <Text color="gray" size="sm" mt={30}>
          {signUp ? 'Already have an Account' : "Don't have an Account"}?
          <Text
            inherit
            variant="link"
            style={{ cursor: 'pointer', textDecoration: 'none' }}
            component="span"
            onClick={() => setSignUp(!signUp)}
          >
            {signUp ? ' SignIn' : ' SignUp'}
          </Text>{' '}
          instead!
        </Text>
      </Card>
    </div>
  );
};

export default Login;
