
import {
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Input,
  InputWrapper,
  Select,
  SimpleGrid,
  Stepper,
  Switch,
  Text,
  Textarea,
} from '@mantine/core';
import { Cross1Icon } from '@modulz/radix-icons';
import { BiDetail } from 'react-icons/bi';
import { GrConfigure } from 'react-icons/gr';
import slack from '../resources/slack.png';
import discord from '../resources/discord.svg';
import trello from '../resources/trello.jpg';
import googlesheet from '../resources/googlesheet.png';
import URLRegex from 'url-regex';
import { BsPlug } from 'react-icons/bs';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import '../styles/components.scss';
import PluginCard from './PluginCard';
import { isEmpty } from 'lodash';
import { useAddFormMutation } from '../redux/api/form';
import { useToast } from '@chakra-ui/react';
import { useGetAllTemplateQuery } from '../redux/api/template';
import { FaGoogle } from 'react-icons/fa';
import OauthPopup from 'react-oauth-popup';
import axios from 'axios';

type NewFormProps = {
  projectID: string | undefined;
  onSuccessCallback: Function;
};

const NewForm: React.FC<NewFormProps> = ({ projectID, onSuccessCallback }) => {
  const [active, setActive] = useState(0);
  const [addForm, { isLoading, isSuccess }] = useAddFormMutation();
  console.log(import.meta.env.VITE_CALLBACk_URL);
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      templateID: '',
      googleCode: {
        access_token: '',
        refresh_token: '',
      },
      origins: [],
      enableEmailNotification: false,
      redirectURL: '',
      plugins: {},
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
      origins: (value: string[]) =>
        isEmpty(value) ? 'The Form should contain at least one origin' : null,
      redirectURL: (value: string) =>
        !(!isEmpty(value) && URLRegex().test(value))
          ? 'Redirect URL should be a valid URL'
          : null,
      googleCode: ({ access_token, refresh_token }) =>
        form.getInputProps('enableEmailNotification').value
          ? isEmpty(access_token) || isEmpty(refresh_token)
            ? 'Need to Authenticate Google Email Service'
            : null
          : null,
      templateID: (value:string) =>
        form.getInputProps('enableEmailNotification').value
          ? isEmpty(value)
            ? 'Need to provide a Template'
            : null
          : null,
    },
  });
  const toast = useToast();
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'New Project Added',
        status: 'success',
      });
      form.reset();
      onSuccessCallback();
    }
  }, [isSuccess]);
  const onValidNext = () => {
    const nameError = active === 0 && form.validateField('name').hasError;
    const descriptionError =
      active === 0 && form.validateField('description').hasError;
    const originError = active === 1 && form.validateField('origins').hasError;
    const authError =
      active === 0 && (form.validateField('googleCode').hasError);
    const templateError =
      active === 0 && form.validateField('templateID').hasError;
    const redirectURLError =
      active === 1 && form.validateField('redirectURL').hasError;
     
    const formDetailHasError = nameError || descriptionError || authError || templateError;
    const formConfigurationHasError = originError || redirectURLError;

    if (!formDetailHasError && !formConfigurationHasError)
      return setActive(active + 1);
  };
  const onFinish = () => {
    if (!form.validate().hasErrors && !isLoading) {
      addForm({ ...form.values, projectID });
    }
  };
  return (
    <div>
      <Stepper  active={active}>
        <Stepper.Step label="Details" icon={<BiDetail />}>
          <FormDetails form={form} />
        </Stepper.Step>
        <Stepper.Step label="Configuration" icon={<GrConfigure />}>
          <FormConfiguration form={form} />
        </Stepper.Step>
        <Stepper.Step icon={null} style={{display:"none"}}>

        </Stepper.Step>
      </Stepper>
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'right',
          gap: '1rem',
        }}
      >
        {active > 0 && (
          <Button variant="outline" onClick={() => setActive(active - 1)}>
            Back
          </Button>
        )}
        {active != 1 ? (
          <Button onClick={onValidNext}>Next</Button>
        ) : (
          <Button loading={isLoading} onClick={onFinish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

const FormDetails: React.FC<{ form: ReturnType<typeof useForm> }> = ({
  form,
}) => {
  const [emailEnable, setEmailEnable] = useState(false);
  const { data: templates, isLoading } = useGetAllTemplateQuery({});
  const onAuthCode = async (code: string) => {
    try {
      axios
        .get(`${import.meta.env.VITE_API}/plugin/google/code?code=${code}`,{withCredentials:true})
        .then((res) => {
          const { access_token, refresh_token } = res.data;
          form.setFieldValue('googleCode', { access_token, refresh_token });
        });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form>
      <Grid>
        <Grid.Col>
          <InputWrapper
            id="formName"
            required
            label="Form Name"
            description="Please Enter a Suitable Name For the Form"
            error={form.errors.name}
          >
            <Input id="formName" {...form.getInputProps('name')} />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col>
          <InputWrapper
            id="formDescription"
            required
            label="Form Description"
            description="Please Enter a short description about the Form"
          >
            <Textarea
              id="formDescription"
              {...form.getInputProps('description')}
            />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col>
          <Switch
            label="Enable Email Confirmation"
            checked={form.getInputProps('enableEmailNotification').value}
            onChange={(e) =>
              form
                .getInputProps('enableEmailNotification')
                .onChange(e.target.checked)
            }
          />
        </Grid.Col>
        <Grid.Col>
          <InputWrapper
            id="templateID"
            required={form.getInputProps('enableEmailNotification').value}
            label="Template"
            description="Please Select Suitable Email Template to Send in Response to the Data Submission"
          >
            <Select
              id="templateID"
              searchable
              // disabled={!emailEnable}
              data={
                isLoading
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
              {...form.getInputProps('templateID')}
            ></Select>
          </InputWrapper>
        </Grid.Col>

        <OauthPopup
          url={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=formID&response_type=code&client_id=825212325994-r4tngsvhg637e1kkkot7uin9jphd6plg.apps.googleusercontent.com&redirect_uri=${
            import.meta.env.VITE_CALLBACK_URL
          }%2Fgoogle%2Fredirect`}
          onCode={onAuthCode}
          onClose={() => { }}
        >
          <Button leftIcon={<FaGoogle />} variant="light">
            Authenticate Google
          </Button>
        </OauthPopup>

        <Grid.Col></Grid.Col>
        <Text ml={10} color="red" size="sm">
          {form.errors.googleCode}
        </Text>
      </Grid>
    </form>
  );
};

const FormConfiguration: React.FC<{ form: any }> = ({ form }) => {
  return (
    <Grid>
      <Grid.Col>
        <InputWrapper
          id="origin"
          label="Origins"
          description="Please Enter a the Allowed Origins and Hit Enter (on Default all the origins are allowed)"
          error={form.errors.origins}
        >
          <Input
            id="origin"
            onKeyDown={(element: KeyboardEvent<HTMLInputElement>) => {
              if (element.code === 'Enter') {
                if (
                  !isEmpty(element.target!.value) &&
                  URLRegex().test(element.target!.value)
                ) {
                  const origins = form.values.origins;
                  origins.push(element.target!.value);
                  form.setFieldValue('origins', origins);
                  element.target.value = '';
                }
              }
            }}
          />
        </InputWrapper>
        <div style={{ marginTop: '1rem' }}>
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
      </Grid.Col>
      <Grid.Col>
        <InputWrapper
          id="redirectURL"
          label="Redirect URL"
          description="Please Enter a URL to Redirect After Submission"
          required
          error={form.errors.redirectURL}
        >
          <Input id="redirectURL" {...form.getInputProps('redirectURL')} />
        </InputWrapper>
      </Grid.Col>
    </Grid>
  );
};


export default NewForm;
