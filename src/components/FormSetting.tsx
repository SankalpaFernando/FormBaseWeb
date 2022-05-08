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
  Select,
  SimpleGrid,
  Switch,
  Table,
  Tabs,
  Text,
  Textarea,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { GoPlus } from 'react-icons/go';
import { FiSearch, FiSettings } from 'react-icons/fi';
import { useForm } from '@mantine/form';
import { FaGoogle, FaWpforms } from 'react-icons/fa';
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
import { MdDelete } from 'react-icons/md';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {
  useDeleteAllMutation,
  useDeleteFormMutation,
  useDeleteWebhookMutation,
  useUpdateFormMutation,
} from '../redux/api/form';
import { Cross1Icon } from '@modulz/radix-icons';
import { formObjectType } from '../utils/customTypes';
import { useGetAllTemplateQuery } from '../redux/api/template';
import OauthPopup from 'react-oauth-popup';
import axios from 'axios';

type FormSettingProps = {
  formID: string;
  formObj: formObjectType;
  refetch: Function;
};

const FormSetting: React.FC<FormSettingProps> = ({
  formID,
  formObj,
  refetch,
}) => {
  const [updateForm, { isSuccess: isFormUpdateSuccess, isLoading }] =
    useUpdateFormMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [
    deleteAllEntries,
    { isSuccess: isDeleteAllSuccess, isLoading: isDeleteAllLoading },
  ] = useDeleteAllMutation();
  const [dialogType, setDialogType] = useState('clear');
  const [
    deleteForm,
    { isSuccess: isDeleteFormSuccess, isLoading: isDeleteFormLoading },
  ] = useDeleteFormMutation();
  const { data: templates, isLoading: isTemplateLoading } =
    useGetAllTemplateQuery({});
  const navigate = useNavigate();
  const toast = useToast();
  const clipboard = useClipboard({ timeout: 1000 });

  const onDetailSubmit = () => {
    if (!form.validate().hasErrors) {
      updateForm({ formID, body: { ...form.values } });
    }
  };
  
  useEffect(() => {
    if (formObj) {
      form.setValues({ ...formObj.data[0] });
      const gmailPlugin = formObj.data[0].plugins.find(
        (plugin) => plugin.name == 'Gmail'
      );
      if (gmailPlugin !== undefined) {
        const {access_token,refresh_token } = gmailPlugin;
        form.setFieldValue('googleCode', { access_token, refresh_token });
      }
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
      if (dialogType === 'clear') {
        toast({
          title: 'All the Entries Cleared',
          status: 'success',
        });
      } else {
        toast({
          title: 'Form Successfully Deleted',
          status: 'success',
        });
        navigate('/projects');
      }
      refetch();
    }
  }, [isDeleteAllSuccess, isDeleteFormSuccess]);
  const onAuthCode = async (code: string) => {
  console.log("🚀 ~ file: FormSetting.tsx ~ line 129 ~ onAuthCode ~ code", code)
    try {
      axios
        .get(`${import.meta.env.VITE_API}/plugin/google/code?code=${code}`, {
          withCredentials: true,
        })
        .then((res) => {
          const { access_token, refresh_token } = res.data;
          axios.post(`${import.meta.env.VITE_API}/plugin/add?formID=${formID}`, { name: "Gmail", access_token, refresh_token },{withCredentials:true}).then(() => {
            form.setFieldValue('googleCode', { access_token, refresh_token });
          })
        });
    } catch (e) {
      console.error(e);
    }
  };
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      testModeOn: false,
      origins: [],
      plugins:[],
      redirectURL: '',
      accessToken: '',
      templateID: '',
      enableEmailNotification: false,
      googleCode: {
        access_token: '',
        refresh_token: '',
      },
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
      redirectURL: (value: string) =>
        isEmpty(value) || !URLRegex().test(value)
          ? 'Redirect URL should be valid URL'
          : null,
    },
  });

  const onDeleteAll = () => {
    if (dialogType === 'clear') {
      deleteAllEntries({ formID });
    } else {
      deleteForm({ formID });
    }
    setDialogOpen(false);
  };

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
              description="Please Enter Form Name"
            >
              <Input id="projectName" {...form.getInputProps('name')} />
            </InputWrapper>
            <InputWrapper
              style={{ textAlign: 'left' }}
              mt={10}
              id="projectDescription"
              label="Form Description"
              description="Please Enter Form Description"
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
              label="Access Token"
              description="Copy the Access Token"
            >
              <Input
                readOnly
                id="projectName"
                {...form.getInputProps('accessToken')}
                rightSection={
                  <div>
                    <Badge
                      size="lg"
                      mr={40}
                      onClick={() => clipboard.copy(form.values.accessToken)}
                    >
                      {clipboard.copied ? 'Copied' : 'Copy'}
                    </Badge>
                  </div>
                }
              />
            </InputWrapper>
            <Switch
              label="Enable Email Confirmation"
              // onChange={(event) =>
              // setEmailEnable(event.currentTarget.checked)
              // }
              checked={form.getInputProps('enableEmailNotification').value}
              onChange={(e) =>
                form
                  .getInputProps('enableEmailNotification')
                  .onChange(e.target.checked)
              }
              mt={20}
              mb={20}
            />

            <InputWrapper
              id="templateID"
              // required={emailEnable}
              style={{ textAlign: 'left' }}
              mt={10}
              label="Template"
              description="Please Select Suitable Email Template to Send in Response to the Data Submission"
            >
              <Select
                id="templateID"
                searchable
                disabled={!form.values.enableEmailNotification}
                data={
                  isTemplateLoading
                    ? []
                    : [
                        ...templates.data.user_templates.map(
                          ({ name: label, _id: value }) => ({
                            label,
                            value,
                            group: 'User Templates',
                          })
                        ),
                        ,
                        ...templates.data.default_templates.map(
                          ({ name: label, _id: value }) => ({
                            label,
                            value,
                            group: 'Default Templates',
                          })
                        ),
                      ]
                }
                allowDeselect
                clearable
                value={form.getInputProps('templateID').value}
                onChange={form.getInputProps('templateID').onChange}
              ></Select>
            </InputWrapper>
            {form.getInputProps('googleCode').value === undefined && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  marginTop: '1.4rem',
                }}
              >
                <OauthPopup
                  url={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=formID&response_type=code&client_id=825212325994-r4tngsvhg637e1kkkot7uin9jphd6plg.apps.googleusercontent.com&redirect_uri=${
                    import.meta.env.VITE_CALLBACK_URL
                  }%2Fgoogle%2Fredirect`}
                  onCode={onAuthCode}
                >
                  <Button leftIcon={<FaGoogle />} variant="light">
                    Authenticate Google
                  </Button>
                </OauthPopup>
              </div>
            )}
            <InputWrapper
              style={{ textAlign: 'left' }}
              id="projectName"
              mt={form.getInputProps('googleCode').value === undefined?5:20}
              label="Allowed Origins"
              description="Please Enter the Origins that are allowed"
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
              description="Please Enter URL to Redirect After Successful Submit"
              error={form.errors.redirectURL}
            >
              <Input id="projectName" {...form.getInputProps('redirectURL')} />
            </InputWrapper>
            <div>
              <Switch
                label="Test Mode"
                // onChange={(event) =>
                // setEmailEnable(event.currentTarget.checked)
                // }
                checked={form.getInputProps('testModeOn').value}
                onChange={(e) =>
                  form.getInputProps('testModeOn').onChange(e.target.checked)
                }
                mt={20}
                mb={5}
              />
              <Text size="xs" align="left" color="gray">
                Turning On the Option will disable the request origin check
              </Text>
            </div>

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
        title={dialogType === 'clear' ? 'Clear the Entries' : 'Delete the Form'}
      >
        <Text>
          {dialogType === 'clear'
            ? 'Do you want to remove all the data in the form ?'
            : 'Do you want to delete the form ?'}
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginTop: '1rem',
          }}
        >
          <Button color="red" onClick={onDeleteAll}>
            Yes,{' '}
            {dialogType === 'clear'
              ? 'Clear the Form Entries'
              : 'Delete the Form'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormSetting;
