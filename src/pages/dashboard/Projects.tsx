import { Button, Grid, Modal, SimpleGrid } from '@mantine/core'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header'
import NewProject from '../../components/NewProject';
import ProjectCard from '../../components/ProjectCard';
import { useGetProjectsQuery } from '../../redux/api/project';
import OauthPopup from "react-oauth-popup"
const Projects: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetProjectsQuery(1);

  const onSuccessSubmit = () => {
    setOpen(false);
    refetch()
  }
  return (
    <div>
      <Header title="Projects" />
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
        {data?.docs?.map(({ _id, name, description }) => (
          <Grid.Col xl={3} lg={4} md={4} sm={6}>
            <ProjectCard id={_id} name={name} description={description} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}

export default Projects