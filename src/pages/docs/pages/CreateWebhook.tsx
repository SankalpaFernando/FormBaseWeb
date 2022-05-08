// @ts-nocheck

import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import FormTab from '../../../resources/FormTab.png';
import AddWebhook from '../../../resources/AddWebhook.png';
import AddWebhookModal from '../../../resources/AddWebhookModal.png';

const CreateWebhook: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Creating a Webhook
      </Text>
      <Text align="left" color="gray" mt={10}>
        Through Formbase you can call your external APIs & services upon the
        success of data submission by creating a <b>Webhook</b>.
      </Text>
      <Text align="left" color="gray" mt={10}>
        To access Webhooks in the Form's <b>Setting</b> page, navigate to the{' '}
        <b>Webhook</b> Tab
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={180} height={0} src={FormTab} />
      </div>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Adding a Webhook
      </Text>
      <Text align="left" color="gray" my={30}>
        By clicking <b>Create Webhook</b> button you could create a Webhook.
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '.1rem',
        }}
      >
        <img width={200} height={0} src={AddWebhook} />
      </div>
      <Text align="left" color="gray" my={30}>
        After clicking the button the following modal will popup
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '.5rem',
        }}
      >
        <img width={500} height={0} src={AddWebhookModal} />
      </div>
      <Text align="left" color="gray" my={30}>
        <b>Webhook Name</b>
        <Text mt={10}>Name of the Webhook</Text>
      </Text>
      <Text align="left" color="gray" my={30}>
        <b>Webhook URL</b>
        <Text mt={10}>
          The URL of the Webhook to call upon the successful submission
        </Text>
      </Text>
      <Text align="left" color="gray" my={30}>
        <b>Token Type</b>
        <Text mt={10}>
          Specify whether the token should be inserted in the <b>URL</b> or in
          the
          <b> Header</b> of the Request
        </Text>
      </Text>
      <Text align="left" color="gray" my={30}>
        <b>Token Name</b>
        <Text mt={10}>
          Specify the Token name to be added either in URL or Header
        </Text>
      </Text>
      <Text align="left" color="gray" my={30}>
        <b>Access Token</b>
        <Text mt={10}>The Access Token for your external API or service</Text>
      </Text>
      <Text align="left" color="gray" my={30}>
        At the end click <b>Create Webhook</b> Button
      </Text>
    </>
  );
};

export default CreateWebhook;
