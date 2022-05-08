// @ts-nocheck

import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import FormSetting from '../../../resources/FormSetting.png';
import BasicFormEdit from '../../../resources/BasicFormEdit.png';
import AccessToken from '../../../resources/AccessToken.png';
import Template from '../../../resources/Template.png';
import GoogleButton from '../../../resources/googleButton.png';

const ConfiguringForm: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Configuring a Form
      </Text>
      <Text align="left" color="gray" mt={10}>
        From the Dashboard, select Project Page and select specific Project and
        then select the specific Form. Then navigate to the
        <b> Settings</b> Tab
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={650} height={0} src={FormSetting} />
      </div>

      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Editing Form Information
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '2rem',
        }}
      >
        <img width={500} height={0} src={BasicFormEdit} />
      </div>
      <Text align="left" color="gray" my={30}>
        In this form you can edit the basic information about the Form
      </Text>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Obtaining the Access Token
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '2rem',
        }}
      >
        <img width={600} height={0} src={AccessToken} />
      </div>
      <Text align="left" color="gray" my={30}>
        <Text mt={10}>You can copy the Access Token for the specific Form</Text>
      </Text>

      <Alert title="Warning!" mb={30}>
        <Text align="left" color="gray">
          Exposing the Access Token in your Frontend is fine unless you turned
          on the <b>Test Mode</b> and specifically define the origins you want
          to allow the access
        </Text>
      </Alert>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Submission Confirmation Email Configuration
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '2rem',
        }}
      >
        <img width={600} height={0} src={Template} />
      </div>
      <Text align="left" color="gray" my={30}>
        <Text mt={10}>
          You can configure the Templates and Turn on and off the Submission
          Confirmation Email functionality
        </Text>
        <Text mt={10}>
          <b>Note</b>
          <p style={{ marginTop: '.5rem' }}>
            If you haven't authorized Formbase for Gmail you can see{' '}
            <b>Authenticate Google</b> button.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              margin: '1rem 0',
            }}
          >
            <img width={200} height={0} src={GoogleButton} />
          </div>
          <p>
            {' '}
            If you want to send Email Confirmations you need to authenticate
            Gmail by clicking the button
          </p>
        </Text>
      </Text>
    </>
  );
};

export default ConfiguringForm;
