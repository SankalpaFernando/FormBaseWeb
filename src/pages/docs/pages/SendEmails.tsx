import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import MailSetting from '../../../resources/MailSetting.png';
import EmailRecipients from '../../../resources/EmailRecipients.png';
import SendEmail from '../../../resources/SendEmail.png';
import EmailTemplate from '../../../resources/EmailTemplate.png';
import DownloadEmail from '../../../resources/DownloadEmail.png';

const ConfiguringForm: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Sending Emails
      </Text>
      <Text align="left" color="gray" mt={10}>
        Using Formbase you can send emails like <b>Newsletter</b> to your
        subscribers. For send emails select the specific form and select the{' '}
        <b>Mail</b>
        <br />
        <br />
        Tab When your user submits the data, if the datasets contain a data
        field name as email it will be detected by the Formbase and will list in
        this Email List section
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={650} height={0} src={MailSetting} />
      </div>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Selecting the Email Recipients
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={700} height={0} src={EmailRecipients} />
      </div>
      <Text align="left" color="gray" my={30}>
        In default, all the mail entries are selected but if you want to send
        Emails only to specific emails you can select the checkbox infront of
        each entry
      </Text>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Sending Email
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '2rem',
        }}
      >
        <img width={120} height={0} src={SendEmail} />
      </div>
      <Text align="left" color="gray" my={30}>
        <Text mt={10}>
          After selecting the recipients click the <b>Send Email</b> button
          which will prompt a dialog as follow{' '}
        </Text>
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '2rem',
        }}
      >
        <img width={500} height={0} src={EmailTemplate} />
      </div>
      <Alert title="Info!" my={30}>
        <Text align="left" color="gray">
          You need to use <b>EJS</b> template engine as email content. You could
          use the data fields in your dataset as parameters to the template
        </Text>
      </Alert>
      <Text align="left" color="gray" my={30}>
        <Text mt={10}>
          After that click <b>Send Email</b> button. After that you will get message saying that the email sending transaction has been recorded then you can continue your work and after the email sending completed Formbase will notify you.
        </Text>
      </Text>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Downloading the Email List
      </Text>
      <Text align="left" color="gray" my={30}>
        <Text mt={10}>
          Formbase let you to download the email list as a Spreadsheet that were recorder in the Mail Section through <b>Download Email List</b>
        </Text>
        <Text mt={10}>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              margin: '1rem 0',
            }}
          >
            <img width={200} height={0} src={DownloadEmail} />
          </div>
          
        </Text>
      </Text>
    </>
  );
};

export default ConfiguringForm;
