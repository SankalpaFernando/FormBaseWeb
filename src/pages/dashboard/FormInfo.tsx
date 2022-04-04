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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EntryTable from '../../components/EntryTable';
import FormDashboard from '../../components/FormDashboard';
import FormSetting from '../../components/FormSetting';
import Header from '../../components/Header';
import { useGetFormByIDQuery } from '../../redux/api/form';
import { RootState } from '../../redux/store';

function FormInfo() {
  const { formID } = useParams();
  const project = useSelector((state: RootState) => state.route.currentProject);
  const { data, refetch } = useGetFormByIDQuery(formID);
  return (
    <div>
      <Header
        link={{ text: project?.name, id: project?.id }}
        title={data?.data[0].name}
      />
      <Tabs mx={15} mt={30}>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<RiDashboard3Line />}
          label="Dashboard"
        >
          <FormDashboard formID={formID} />
        </Tabs.Tab>
        <Tabs.Tab style={{ padding: '0 3rem' }} icon={<BiData />} label="Data">
          <EntryTable formID={formID} />
        </Tabs.Tab>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<FiSettings />}
          label="Settings"
        >
          <FormSetting formID={formID} formObj={data} refetch={refetch} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default FormInfo;
