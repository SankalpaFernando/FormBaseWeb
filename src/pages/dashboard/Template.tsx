import { Badge, Button, Grid, Modal, Pagination, SimpleGrid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header';
import NewProject from '../../components/NewProject';
import ProjectCard from '../../components/ProjectCard';
import { useGetProjectsQuery } from '../../redux/api/project';
import OauthPopup from 'react-oauth-popup';
import NewTemplate from '../../components/NewTemplate';
import { useGetTemplateQuery } from '../../redux/api/template';
import TemplateCard from '../../components/TemplateCard';
const Template: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"User" | "Default">("User");
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetTemplateQuery({type,page});
  const onSuccessSubmit = () => {
    setOpen(false);
    refetch({type:"User",page});
  };
  useEffect(() => {
    refetch({type,page});
  }, [type]);
  return (
    <div>
      <Header title="Templates" />
      <Grid>
        <Button
          style={{}}
          my={30}
          mx={25}
          onClick={() => setOpen(true)}
          variant="light"
          leftIcon={<GoPlus />}
        >
          New Template
        </Button>
        <Modal size="xl" opened={open} onClose={() => setOpen(false)}>
          <NewTemplate type="Add" successCallback={onSuccessSubmit} />
        </Modal>
      </Grid>
      <Grid mx={25} my={10} style={{ gap: '1rem' }}>
        <Badge
          onClick={() => setType('User')}
          variant={type == 'User' ? 'dot' : 'light'}
          size="lg"
        >
          User Templates
        </Badge>
        <Badge
          onClick={() => setType('Default')}
          variant={type == 'Default' ? 'dot' : 'light'}
          size="lg"
        >
          Default Templates
        </Badge>
      </Grid>
      <Grid>
        {data?.docs?.map(({ _id, name, template }) => (
          <Grid.Col xl={3} lg={4} md={4} sm={6}>
            <TemplateCard
              id={_id}
              refetch={() => refetch(type)}
              name={name}
              type={type}
              template={template}
            />
          </Grid.Col>
        ))}
      </Grid>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '4rem 0',
        }}
      >
        <Pagination
          style={{ flexWrap: 'nowrap', WebkitFlexWrap: 'nowrap' }}
          total={data?.totalPages}
          size="lg"
          onChange={(page) =>setPage(page)}
        />
      </div>
    </div>
  );
};

export default Template;
