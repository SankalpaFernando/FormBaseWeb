// @ts-nocheck

import React from 'react';
import { Alert, Code, Text } from '@mantine/core';
import DataTab from '../../../resources/DataTab.png';
import DataSet from '../../../resources/DataSet.png';
import DownloadDataset from '../../../resources/DownloadDataset.png';
import EmailTemplate from '../../../resources/EmailTemplate.png';
import DownloadEmail from '../../../resources/DownloadEmail.png';

const ExportDataset: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Exporting Data Set
      </Text>
      <Text align="left" color="gray" mt={10}>
        Using Formbase you can view the dataset that entered through forms. To
        view Dataset select the <b>Data</b> Tab of specific form
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={650} height={0} src={DataTab} />
      </div>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Viewing Data Set
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={700} height={0} src={DataSet} />
      </div>
      <Text align="left" color="gray" my={30}>
        In the Data Set Tab you can see the data set organized with a row with{' '}
        <b>Date</b> and <b>Data</b>. And you can uncollapse all the data fields
        by the icon in the left corner.
      </Text>
      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Exporting Data Set
      </Text>
      <Text align="left" color="gray" my={30}>
        <Text mt={10}>
          You can export the Data set as a Spreadsheet by clicking the{' '}
          <b>Download Dataset</b> button
        </Text>
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '2rem',
        }}
      >
        <img width={180} height={0} src={DownloadDataset} />
      </div>
    </>
  );
};

export default ExportDataset;
