// @ts-nocheck
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
import { GoPlus } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import { useForm } from '@mantine/form';
import { FaWpforms } from 'react-icons/fa';
import Header from '../../components/Header';
import ProjectCard from '../../components/ProjectCard';
import {
  useGetProjectByIDQuery,
  useUpdateProjectMutation,
} from '../../redux/api/project';
import { useGetFormsByProjectIDQuery } from '../../redux/api/form';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router';
import { useToast } from '@chakra-ui/react';
import NewForm from '../../components/NewForm';
import FormCard from '../../components/FormCard';
import ProjectSetting from '../../components/ProjectSetting';

const ProjectInfo: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { projectID } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: formsData,
    isLoading,
    refetch: formRefetch,
  } = useGetFormsByProjectIDQuery({ projectID, page });
  const { data: projectData, refetch: projectRefetch } =
    useGetProjectByIDQuery(projectID);

  const onSuccessCallback = () => {
    setOpen(false);
    formRefetch();
  };

  useEffect(() => {
    formRefetch();
  }, []);

  return (
    <div>
      <Header title={`${projectData?.data[0]?.name}`} />
      <Tabs mx={15} mt={30}>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<FaWpforms />}
          label="Forms"
        >
          <Grid>
            <Button
              style={{}}
              my={30}
              mx={15}
              onClick={() => setOpen(true)}
              variant="light"
              leftIcon={<GoPlus />}
            >
              New Form
            </Button>
            <Modal size="lg" opened={open} onClose={() => setOpen(false)}>
              <NewForm
                onSuccessCallback={onSuccessCallback}
                projectID={projectID}
              />
            </Modal>
          </Grid>
          <Grid>
            {formsData?.docs?.map(({ _id, name, description }) => (
              <Grid.Col xl={3} lg={6}>
                <FormCard id={_id} name={name} description={description} />
              </Grid.Col>
            ))}
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Pagination
              total={formsData?.totalPages}
              size="lg"
              onChange={(page) => setPage(page)}
            />
          </div>
        </Tabs.Tab>
        <Tabs.Tab
          style={{ padding: '0 3rem' }}
          icon={<FiSettings />}
          label="Settings"
        >
          <ProjectSetting
            project={projectData?.data[0]}
            projectRefetch={projectRefetch}
            formRefetch={formRefetch}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default ProjectInfo;
