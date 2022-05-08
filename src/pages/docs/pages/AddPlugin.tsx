// @ts-nocheck

import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import PluginTab from '../../../resources/PluginTab.png';
import PluginCard from '../../../resources/PluginCard.png';
import SpreadSheet from '../../../resources/SpreadSheet.png';

const AddPlugin: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Adding a Plugin
      </Text>
      <Text align="left" color="gray" mt={10}>
        By adding a <b>Plugin</b> you can stream your user submitted data to
        pre-specified data platforms such as <b>Google Sheet</b> or messaging
        services like <b>Discord</b>
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={180} height={0} src={PluginTab} />
      </div>

      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Streaming Data to Google Sheets
      </Text>
      <Text align="left" color="gray" mt={30}>
        After navigating to the <b>Plugin</b> Tab, you could see{' '}
        <b>Google Sheet</b> plugin Card as follow.
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '.5rem',
        }}
      >
        <img width={250} height={0} src={PluginCard} />
      </div>
      <Text align="left" color="gray" my={30}>
        To use Plugin, first you need to <b>authorize</b> the service.
        Therefore, click on the <b>Authorize</b> Button in the{' '}
        <b>Google Sheet Plugin Card</b>, which will popup a oauth dialog. After
        authorizing the Google Sheet a dialog will popup as follow with all the{' '}
        <b>Existing Spreadsheets</b> in your account.
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '.5rem',
        }}
      >
        <img width={500} height={0} src={SpreadSheet} />
      </div>
      <Text align="left" color="gray" my={30}>
        Then select a SpreadSheet from the dropdown and click <b>Confirm</b>{' '}
        Button to complete the adding of Spreadsheet Plugin
      </Text>
    </>
  );
};

export default AddPlugin;
