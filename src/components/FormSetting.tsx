import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Input,
  InputWrapper,
  Modal,
  Pagination,
  SimpleGrid,
  Table,
  Tabs,
  Text,
  Textarea,
} from '@mantine/core';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { GoPlus } from 'react-icons/go';
import { FiSearch, FiSettings } from 'react-icons/fi';
import { useForm } from '@mantine/form';
import { FaWpforms } from 'react-icons/fa';
import { isEmpty } from 'lodash';
import { useNavigate, useParams } from 'react-router';
import { Thead, useToast } from '@chakra-ui/react';
import slack from '../resources/slack.png';
import discord from '../resources/discord.svg';
import trello from '../resources/trello.jpg';
import googlesheet from '../resources/googlesheet.png';
import URLRegex from 'url-regex';

import {
  useGetProjectByIDQuery,
  useUpdateProjectMutation,
} from '../redux/api/project';
import PluginCard from './PluginCard';
import { WebhookCreate, WebhookItems } from './Webhook';
import { GrDocumentUpdate } from 'react-icons/gr';
import { MdDelete} from "react-icons/md"
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { useDeleteAllMutation, useDeleteFormMutation, useDeleteWebhookMutation, useUpdateFormMutation } from '../redux/api/form';
import { Cross1Icon } from '@modulz/radix-icons';
import { formObjectType } from '../utils/customTypes';

type FormSettingProps = {
  formID: string;
  formObj: formObjectType;
  refetch: Function
};

const FormSetting: React.FC<FormSettingProps> = ({ formID, formObj, refetch }) => {
  const [updateForm, { isSuccess:isFormUpdateSuccess, isLoading }] = useUpdateFormMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAllEntries, { isSuccess: isDeleteAllSuccess, isLoading: isDeleteAllLoading }] = useDeleteAllMutation();
  const [dialogType,setDialogType] = useState("clear");
  const [deleteForm, { isSuccess: isDeleteFormSuccess, isLoading: isDeleteFormLoading }] = useDeleteFormMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const onDetailSubmit = () => {
    if (!form.validate().hasErrors) {
      updateForm({ formID, body: { ...form.values } });
    }
  };

  useEffect(() => {
    if (formObj) {
      form.setValues({ ...formObj.data[0] });
    }
  }, [formObj]);
  useEffect(() => {
    if (isFormUpdateSuccess) {
      toast({
        title: 'Form Details Updated',
        status: 'success',
      });
      refetch();
    }
  }, [isFormUpdateSuccess]);
  useEffect(() => {
    if (isDeleteAllSuccess || isDeleteFormSuccess) {
      if (dialogType==="clear") {
        toast({
          title: 'All the Entries Cleared',
          status: 'success',
        });
      } else {
        toast({
          title: 'Form Successfully Deleted',
          status: 'success',
        });
        navigate("/projects")
      }
      refetch();
    }
},[isDeleteAllSuccess,isDeleteFormSuccess])  
  const form = useForm({
    initialValues: { name: '', description: '', origins: [], redirectURL: '' },
    validate: {
      name: (value: string) =>
        value.length < 5
          ? 'Project Name should at least contain 5 characters'
          : null,
      description: (value: string) =>
        value.length < 50
          ? 'Project Description should at least contain 50 characters'
          : null,
      redirectURL: (value: string) =>
        isEmpty(value) || !URLRegex().test(value)
          ? 'Redirect URL should be valid URL'
          : null,
    },
  });

  const onDeleteAll = () => {
    if (dialogType === "clear") {
      deleteAllEntries({formID});
    } else {
      deleteForm({ formID });
    }
    setDialogOpen(false);
  }

  return (
    <>
      <Tabs
        orientation="vertical"
        style={{ width: '80%', margin: '3rem auto' }}
        variant="outline"
        styles={{ body: { width: '100%' }, tabsList: { width: '8rem' } }}
      >
        <Tabs.Tab label="Form Info">
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
              label="Form Name"
              description="Please Select Plugins to Configure with Project"
            >
              <Input id="projectName" {...form.getInputProps('name')} />
            </InputWrapper>
            <InputWrapper
              style={{ textAlign: 'left' }}
              mt={10}
              id="projectDescription"
              label="Form Description"
              description="Please Select Plugins to Configure with Project"
            >
              <Textarea
                id="projectDescription"
                {...form.getInputProps('description')}
              />
            </InputWrapper>
            <InputWrapper
              style={{ textAlign: 'left' }}
              id="projectName"
              mt={10}
              label="Allowed Origins"
              description="Please Select Plugins to Configure with Project"
              error={form.errors.origins}
            >
              <Input
                id="projectName"
                onKeyDown={(element: React.KeyboardEvent<HTMLInputElement>) => {
                  if (element.code === 'Enter') {
                    if (
                      !isEmpty(element.target!.value) &&
                      URLRegex().test(element.target!.value)
                    ) {
                      const origins = [...form.values.origins];
                      origins.push(element.currentTarget.value);
                      form.setFieldValue('origins', origins);
                      element.target.value = '';
                      form.clearFieldError('origins');
                    } else {
                      form.setFieldError(
                        'origins',
                        'Only Valid Origins/URLs are Allowed'
                      );
                    }
                  }
                }}
              />
            </InputWrapper>
            <div style={{ marginTop: '1rem', display: 'flex' }}>
              {form.values.origins.map((origin, index) => (
                <Badge
                  className="badge"
                  rightSection={
                    <Cross1Icon
                      onClick={() => {
                        form.setFieldValue(
                          'origins',
                          form.values.origins.filter(
                            (value, originIndex) => index != originIndex
                          )
                        );
                      }}
                    />
                  }
                >
                  {origin}
                </Badge>
              ))}
            </div>
            <InputWrapper
              style={{ textAlign: 'left' }}
              mt={10}
              id="projectName"
              label="Redirect URL"
              description="Please Select Plugins to Configure with Project"
              error={form.errors.redirectURL}
            >
              <Input id="projectName" {...form.getInputProps('redirectURL')} />
            </InputWrapper>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                marginTop: '1.8rem',
              }}
            >
              <Button loading={isLoading} onClick={onDetailSubmit}>
                Save Changes
              </Button>
            </div>
          </Card>
        </Tabs.Tab>
        <Tabs.Tab label="Plugins">
          <Grid>
            <Grid.Col>
              <SimpleGrid
                cols={3}
                style={{ width: '80%', margin: 'auto', marginTop: '.8rem' }}
              >
                <PluginCard
                  icon={googlesheet}
                  name="Google Sheet"
                  description="Configure to append the submitted data to a google sheet"
                  formID={formID}
                  callback={() => refetch()}
                  activated={
                    !isEmpty(
                      formObj?.data[0]?.plugins?.filter(
                        (item) => item.name == 'Google Sheet'
                      )
                    )
                  }
                />
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </Tabs.Tab>
        <Tabs.Tab label="Webhooks">
          <WebhookItems refetch={refetch} formObj={formObj} formID={formID} />
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
              <Button
                color="red"
                onClick={() => {
                  setDialogOpen(true);
                  setDialogType('clear');
                }}
                variant="outline"
              >
                Clear Form Data
              </Button>
              <Button
                onClick={() => {
                  setDialogOpen(true);
                  setDialogType('delete');
                }}
                color="red"
              >
                Delete Form
              </Button>
            </div>
          </Card>
        </Tabs.Tab>
      </Tabs>
      <Modal
        size="sm"
        opened={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogType==="clear"?"Clear the Entries":"Delete the Form"}
      >
        <Text>{dialogType==="clear"?"Do you want to remove all the data in the form ?":"Do you want to delete the form ?"}</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginTop: '1rem',
          }}
        >
          <Button color="red" onClick={onDeleteAll}>
            Yes, {dialogType==="clear"?"Clear the Form Entries":"Delete the Form"}
          </Button>
        </div>
      </Modal>
    </>
  );
};




export default FormSetting;
