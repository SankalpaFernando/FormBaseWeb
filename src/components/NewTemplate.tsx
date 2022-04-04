import { Button, Grid, Input, InputWrapper, Textarea } from '@mantine/core';
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useAddPostMutation } from '../redux/api/project';
import { isEmpty } from 'lodash';
import { useToast } from '@chakra-ui/react';
import { useAddTemplateMutation, useUpdateTemplateMutation } from '../redux/api/template';

type NewProjectProps = {
  successCallback: Function;
  type: "Update" | "Add",
  data?: {
    name: string;
    template: string;
    id: string;
  }
};

const NewTemplate: React.FC<NewProjectProps> = ({ successCallback,type,data }) => {
  const [addTemplate, { isLoading, isSuccess }] = useAddTemplateMutation();
  const [updateTemplate, { isLoading:isUpdateLoading, isSuccess:isUpdateSuccess }] = useUpdateTemplateMutation();

  const toast = useToast();
  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      toast({
        title: type === 'Add' ? 'New Template Added' : 'Template Updated',
        status: 'success',
      });
      form.reset();
      successCallback();
    }
  }, [isSuccess,isUpdateSuccess]);
  useEffect(() => {
    if (type === 'Update' && data != undefined) {
      form.setValues({ name: data.name, template: data.template });
    }
  },[])
  const form = useForm({
    initialValues: {
      name: '',
      template: '',
    },
    validate: {
      name: (value: string) =>
        value.length < 5
          ? 'Template Name should at least contain 5 characters'
          : null,
      template: (value: string) =>
        value.length < 50
          ? 'Template should have at least contain 50 characters'
          : null,
    },
  });
  
  const onSubmit = () => {
    if (!form.validate().hasErrors) {
      if (type === "Add") return addTemplate(form.values);
      return updateTemplate({templateID:data?.id,body:{...form.values}})
    }
  };
  return (
    <Grid>
      <Grid.Col>
        <InputWrapper
          id="projectName"
          label="Template Name"
          description="Please Enter a Suitable Name For the Template"
          required
          error={form.errors.name}
        >
          <Input id="projectName" {...form.getInputProps('name')} />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col>
        <InputWrapper
          id="projectDescription"
          label="Template"
          description="Please Insert the Ejs Template"
          required
        >
          <Textarea
            id="projectDescription"
            autosize
            {...form.getInputProps('template')}
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
            {type} Template
          </Button>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default NewTemplate;
