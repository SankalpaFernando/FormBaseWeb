import { Badge, Box, Button, Grid, Group, Image, Input, InputWrapper, Select, SimpleGrid, Stepper, Switch, Text, Textarea } from '@mantine/core'
import { Cross1Icon } from '@modulz/radix-icons';
import { BiDetail } from "react-icons/bi";
import { GrConfigure } from "react-icons/gr";
import slack from "../resources/slack.png"
import discord from "../resources/discord.svg"
import trello from "../resources/trello.jpg";
import googlesheet from '../resources/googlesheet.png';
import URLRegex from "url-regex";
import { BsPlug } from 'react-icons/bs';
import React, { KeyboardEvent, useEffect, useState } from 'react'
import {useForm} from "@mantine/form"
import "../styles/components.scss"
import PluginCard from './PluginCard';
import { isEmpty } from 'lodash';
import { useAddFormMutation } from '../redux/api/form';
import { useToast } from '@chakra-ui/react';

type NewFormProps = {
  projectID: string | undefined;
  onSuccessCallback:Function
}


const NewForm: React.FC<NewFormProps> = ({ projectID, onSuccessCallback }) => {
  const [active, setActive] = useState(0);
  const [addForm, { isLoading,isSuccess }] = useAddFormMutation();
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      origins: [],
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
    const redirectURLError =
      active === 1 && form.validateField('redirectURL').hasError;

    const formDetailHasError = nameError || descriptionError;
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
      <Stepper active={active}>
        <Stepper.Step label="Details" icon={<BiDetail />}>
          <FormDetails form={form} />
        </Stepper.Step>
        <Stepper.Step label="Configuration" icon={<GrConfigure />}>
          <FormConfiguration form={form} />
        </Stepper.Step>
        <Stepper.Step label="Plugins" icon={<BsPlug />}>
          <PluginConfiguration form={form} />
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
        {active != 2 ? (
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

const FormDetails: React.FC<{form:any}> = ({ form }) => {
  const [emailEnable, setEmailEnable] = useState(false);
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
            onChange={(event) => setEmailEnable(event.currentTarget.checked)}
          />
        </Grid.Col>
        <Grid.Col>
          <InputWrapper
            id="templateID"
            required={emailEnable}
            label="Email Template"
            description="Please Select Suitable Email Template to Send in Response to the Data Submission"
          >
            <Select
              id="templateID"
              searchable
              disabled={!emailEnable}
              data={[
                { label: 'New Template', value: '10454' },
                { label: 'Older', value: '1045' },
                { label: 'Email', value: '1054' },
              ]}
            ></Select>
          </InputWrapper>
        </Grid.Col>
      </Grid>
    </form>
  );
};


const FormConfiguration: React.FC<{form:any}> = ({form}) => {
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
}

const PluginConfiguration: React.FC = () => {
  return (
    <Grid>
      <Grid.Col>
        <InputWrapper
          id="plugin"
          label="Plugins"
          description="Please Select Plugins to Configure with Project"
        >
          <Input id="plugin" />
        </InputWrapper>
      </Grid.Col>
      <Grid.Col>
        <SimpleGrid cols={2} style={{width:"95%",margin:"auto",marginTop:".8rem"}}>
          <PluginCard
            icon={slack}
            name="Slack"
            description="Configure to receive message to a channel when a Form Submission happens"
          />
          <PluginCard
            icon={discord}
            name="Discord"
            description="Configure to receive message to a discord channel when a form get submitted"
          />
          <PluginCard
            icon={trello}
            name="Trello"
            description="Configure to create a card from a form submission"
          />
          <PluginCard
            icon={googlesheet}
            name="Google Sheet"
            description="Configure to append the submitted data to a google sheet"
          />
        </SimpleGrid>
      </Grid.Col>
    </Grid>
  );
}

export default NewForm;