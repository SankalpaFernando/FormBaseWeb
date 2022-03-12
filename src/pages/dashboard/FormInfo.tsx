import {
  Button,
  Card,
  Grid,
  Input,
  InputWrapper,
  Modal,
  Pagination,
  Tabs,
  Text,
  Textarea,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { BiData } from 'react-icons/bi';
import { FaWpforms } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { RiDashboard3Line } from 'react-icons/ri';
import Header from '../../components/Header';

function FormInfo() {
  return (
    <div>
      <Header title="Form" />
      <Tabs mx={15} mt={30}>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<RiDashboard3Line />}
          label="Dashboard"
        ></Tabs.Tab>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<BiData />}
          label="Data"
        ></Tabs.Tab>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<FiSettings />}
          label="Settings"
        ></Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default FormInfo;
