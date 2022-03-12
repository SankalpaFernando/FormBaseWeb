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
import { isEmpty } from 'lodash';
import { useParams } from 'react-router';
import { useToast } from '@chakra-ui/react';
import { useGetProjectByIDQuery, useUpdateProjectMutation } from '../redux/api/project';

type ProjectSettingProps = {
  project: {
    _id: string;
    name: string;
    description: string;
  },
  projectRefetch:Function
};


const ProjectSetting: React.FC<ProjectSettingProps> = ({project,projectRefetch}) => {
  const [updateProject, { isLoading: isUpdateLoading, isSuccess }] = useUpdateProjectMutation();
  const toast = useToast();

  useEffect(() => {
    
    if (!isEmpty(project)) {
      const { name,description} = project;
      form.setValues({
        name,
        description,
      });
    }
  }, [project]);
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Project Details Updated',
        status: 'success',
      });
      projectRefetch();
    }
  }, [isSuccess]);
  const form = useForm({
    initialValues: { name: '', description: '' },
    validate: {
      name: (value: string) =>
        value.length < 5
          ? 'Project Name should at least contain 5 characters'
          : null,
      description: (value: string) =>
        value.length < 50
          ? 'Project Description should at least contain 50 characters'
          : null,
    },
  });

  const onSuccessSubmit = () => {
    if (!form.validate().hasErrors && !isUpdateLoading) {
      updateProject({ projectID: project._id, data: { ...form.values } });
    }
  };
  return (
    <Tabs
      orientation="vertical"
      style={{ width: '80%', margin: '3rem auto' }}
      variant="outline"
      styles={{ body: { width: '100%' }, tabsList: { width: '8rem' } }}
    >
      <Tabs.Tab label="Project Info">
        <Card
          shadow="md"
          style={{
            width: '80%',
            margin: '1rem 0 0 2rem',
            padding: '2rem 4rem',
          }}
        >
          <InputWrapper
            style={{ textAlign: 'left' }}
            id="projectName"
            label="Project Name"
            description="Please Select Plugins to Configure with Project"
          >
            <Input id="projectName" {...form.getInputProps('name')} />
          </InputWrapper>
          <InputWrapper
            style={{ textAlign: 'left' }}
            mt={10}
            id="projectDescription"
            label="Project Description"
            description="Please Select Plugins to Configure with Project"
          >
            <Textarea
              id="projectDescription"
              {...form.getInputProps('description')}
            />
          </InputWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              marginTop: '1.8rem',
            }}
          >
            <Button loading={isUpdateLoading} onClick={onSuccessSubmit}>
              Save Changes
            </Button>
          </div>
        </Card>
      </Tabs.Tab>
      <Tabs.Tab label="Danger Zone">
        <Card
          shadow="md"
          style={{
            width: '80%',
            margin: '1rem 0 0 2rem',
            padding: '2rem 4rem',
          }}
        >
          <Text size="xl" align="left" color="red">
            Danger Zone
          </Text>
          <Text align="justify" color="gray" mt={15}>
            Be sure to backup any data before to proceed any operation in the
            bottom. Deleting the Project will cause removing the backups as
            well.
          </Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              marginTop: '1.8rem',
              gap: '1rem',
            }}
          >
            <Button color="red" variant="outline">
              Delete Forms
            </Button>
            <Button color="red">Delete Project</Button>
          </div>
        </Card>
      </Tabs.Tab>
    </Tabs>
  );
}

export default ProjectSetting