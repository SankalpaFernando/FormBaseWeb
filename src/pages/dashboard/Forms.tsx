import { Button, Grid, Modal, SimpleGrid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header';
import NewProject from '../../components/NewProject';
import ProjectCard from '../../components/ProjectCard';
import { useGetProjectsQuery } from '../../redux/api/project';
import OauthPopup from 'react-oauth-popup';
import { useGetAllFormsQuery } from '../../redux/api/form';
import FormCard from '../../components/FormCard';
const Forms: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetAllFormsQuery({});

  const onSuccessSubmit = () => {
    setOpen(false);
    refetch();
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div>
      <Header title="Forms" />
      <Grid>
        <Modal size="lg" opened={open} onClose={() => setOpen(false)}>
          <NewProject successCallback={onSuccessSubmit} />
        </Modal>
      </Grid>
      <Grid>
        {data?.map(({ _id, name, description }) => (
          <Grid.Col xl={3} lg={4} md={4} sm={6}>
            <FormCard id={_id} name={name} description={description}/>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Forms;
