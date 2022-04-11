// @ts-nocheck

import { Button, Grid, Input, InputWrapper, Textarea } from '@mantine/core';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useAddPostMutation } from '../redux/api/project';
import { isEmpty } from 'lodash';
import { useToast } from '@chakra-ui/react';

type NewProjectProps = {
  successCallback: Function;
};

const NewProject: React.FC<NewProjectProps> = ({ successCallback }) => {
  const [addPost, { isLoading, isSuccess }] = useAddPostMutation();
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'New Project Added',
        status: 'success',
      });
      form.reset();
      successCallback();
    }
  }, [isSuccess]);
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },
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
  const onSubmit = () => {
    if (!form.validate().hasErrors && !isLoading) {
      addPost({ ...form.values });
    }
  };
  return (
    <Grid>
      <Grid.Col>
        <InputWrapper
          id="projectName"
          label="Project Name"
          description="Please Enter a Suitable Name For the Project"
          required
          error={form.errors.name}
        >
          <Input id="projectName" {...form.getInputProps('name')} />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col>
        <InputWrapper
          id="projectDescription"
          label="Project Description"
          description="Please Enter a Suitable Description For the Project"
          required
        >
          <Textarea
            id="projectDescription"
            {...form.getInputProps('description')}
          />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col>
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'right',
            gap: '1rem',
          }}
        >
          <Button loading={isLoading} onClick={onSubmit}>
            Add Project
          </Button>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default NewProject;
