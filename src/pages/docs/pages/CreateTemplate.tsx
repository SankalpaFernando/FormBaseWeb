// @ts-nocheck

import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import TemplateTypes from '../../../resources/TemplateTypes.png';
import EmailTemplateModal from '../../../resources/EmailTemplateModal.png';
import NewFormTwo from '../../../resources/NewFormTwo.png';

const CreateTemplate: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Creating a Template
      </Text>
      <Text align="left" color="gray" mt={10}>
        As mention in{' '}
        <a href="" style={{ color: 'teal' }}>
          here
        </a>
        , Formbase allows you to send Confirmation Email Templates which are
        filled with the user data. We Formbase has a collection of these
        Templates that can be used and also you can create your own Templates as
        well.
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={400} height={0} src={TemplateTypes} />
      </div>
      <Text align="left" color="gray" mt={10}>
        Currently, Formbase only supports the <b>EJS</b> Template Language for
        creating Email Templates
      </Text>
      <Text align="left" color="black" mt={20} weight="500" size="xl">
        Step 01
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '.5rem',
        }}
      >
        <img width={500} height={0} src={EmailTemplateModal} />
      </div>
      <Text align="left" color="gray" my={30}>
        <b>Subject</b>
        <Text mt={10}>This Specify the Subject of the Email</Text>
        <Text mt={5}>
          To add a domain, enter the full form of the domain and press enter,
          for an instance <Code>https://web.dev</Code>
        </Text>
      </Text>
      <Alert title="Warning!" mb={30}>
        <Text align="left" color="gray">
          At the time of creation, the form will be on the <b>Test Mode</b>{' '}
          which will surpass the domain check function. So, prior to the
          production you need to turn off it manually as described in{' '}
          <a style={{ color: 'teal' }} href="#">
            here
          </a>
        </Text>
      </Alert>
      <Text align="left" color="gray" my={30}>
        At the end click <b>Finish</b> Button
      </Text>
    </>
  );
};

export default CreateTemplate;
