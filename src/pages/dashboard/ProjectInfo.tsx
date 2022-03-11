import { Button, Grid, Modal, SimpleGrid } from '@mantine/core';
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header';
import NewProject from '../../components/NewProject';
import ProjectCard from '../../components/ProjectCard';
import {
  useAddPostMutation,
  useGetProjectsQuery,
} from '../../redux/api/project';

const ProjectInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetProjectsQuery(1);

  const onSuccessSubmit = () => {
    setOpen(false);
    refetch();
  };
  return (
    <div>
      <Header title="Project One" />
      <Grid>
        <Button
          style={{}}
          my={30}
          mx={25}
          onClick={() => setOpen(true)}
          variant="light"
          leftIcon={<GoPlus />}
        >
          New Project
        </Button>
        <Modal size="lg" opened={open} onClose={() => setOpen(false)}>
          <NewProject successCallback={onSuccessSubmit} />
        </Modal>
      </Grid>
      <Grid>
        {data?.docs?.map(({ name, description }) => (
          <Grid.Col xl={3}>
            <ProjectCard name={name} description={description} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default ProjectInfo;
