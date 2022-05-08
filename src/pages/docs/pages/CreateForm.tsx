import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import NewFormButton from '../../../resources/NewFormButton.png';
import NewFormOne from '../../../resources/NewFormOne.png';
import NewFormTwo from '../../../resources/NewFormTwo.png';

const CreateForm: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Creating a Form
      </Text>
      <Text align="left" color="gray" mt={10}>
        From the Dashboard, select Project Page and select specific Project and
        click the on the Project which will direct you to the project page, from
        there click on the <b>New Form</b> button in the left corner
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={180} height={0} src={NewFormButton} />
      </div>
      <Text align="left" color="gray" mt={10}>
        and then it will prompt a modal as follow,
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
        <img width={500} height={0} src={NewFormOne} />
      </div>
      <Text align="left" color="gray" my={30}>
        In this step add the basic information about the <b>Form</b> and if you
        want to send <b>Submission Confirmation Email</b> through{' '}
        <b>Formbase</b> you need to authenticate the App to your{' '}
        <b>Google Account</b> to do so. The instructions to configure{' '}
        <b>the Submission Confirmation Email</b> can be found{' '}
        <a style={{ color: 'teal' }} href="#">
          here
        </a>
      </Text>
      <Text align="left" color="black" mt={20} weight="500" size="xl">
        Step 02
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '.5rem',
        }}
      >
        <img width={500} height={0} src={NewFormTwo} />
      </div>
      <Text align="left" color="gray" my={30}>
        <b>Origins</b>
        <Text mt={10}>
          Origins are used as barrier to check whether a specific request is
          from a allowed domain. Unless you add a specific domain in to the
          form, the requests which are sent by that domain will be denied.
        </Text>
        <Text mt={5}>
          To add a domain, enter the full form of the domain and press enter,
          for an instance <Code>https://web.dev</Code>
        </Text>
      </Text>
      <Text align="left" color="gray" my={30}>
        <b>Redirect URL</b>
        <Text mt={10}>
          When a the specific data submission got succeed, Formbase will
          redirect your request to this URL.
        </Text>
        <Text mt={5}>
          You can use any type of URL whether a webpage or any other hypermedia
          resource like images,videos
        </Text>
      </Text>
      <Alert title="Warning!"  mb={30}>
        <Text align="left" color="gray">
          At the time of creation, the form will be on the <b>Test Mode</b>{' '}
          which will surpass the domain check function. So, prior to the production you need to turn off it
          manually as described in{' '}
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

export default CreateForm;
