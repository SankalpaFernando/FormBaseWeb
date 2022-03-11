import { Badge, Box, Button, Grid, Group, Image, Input, InputWrapper, Select, SimpleGrid, Stepper, Switch, Text, Textarea } from '@mantine/core'
import { Cross1Icon } from '@modulz/radix-icons';
import { BiDetail } from "react-icons/bi";
import { GrConfigure } from "react-icons/gr";
import slack from "../resources/slack.png"
import discord from "../resources/discord.svg"
import trello from "../resources/trello.jpg";
import googlesheet from '../resources/googlesheet.png';
import { GiFinishLine } from "react-icons/gi";
import React, { KeyboardEvent, KeyboardEventHandler, useState } from 'react'
import {useForm} from "@mantine/form"
import "../styles/components.scss"
import PluginCard from './PluginCard';
const NewForm: React.FC = () => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Stepper active={active}>
        <Stepper.Step label="Details" icon={<BiDetail />}>
          <FormDetails />
        </Stepper.Step>
        <Stepper.Step label="Configuration" icon={<GrConfigure />}>
          <FormConfiguration />
        </Stepper.Step>
        <Stepper.Step label="Plugins">
          <PluginConfiguration />
        </Stepper.Step>
      </Stepper>
      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'right',gap:"1rem" }}
      >
        {active > 0 && (
          <Button variant="outline" onClick={() => setActive(active - 1)}>Back</Button>
        )}
        {active != 3 ? (
          <Button onClick={() => setActive(active + 1)}>Next</Button>
        ) : (
          <Button onClick={() => setActive(active + 1)}>Finish</Button>
        )}
      </div>
    </div>
  );
}

const FormDetails: React.FC = () => {
  const form = useForm({
    initialValues: {
      		name: ""
    }
  })
  return (
    <form>
      <Grid>
        <Grid.Col>
          <InputWrapper
            id="formName"
            required
            label="Form Name"
            description="Please Enter a Suitable Name For the Form"
            // error="Project Name is Required"
          >
            <Input id="formName" />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col>
          <InputWrapper
            id="formDescription"
            required
            label="Form Description"
            description="Please Enter a short description about the Form"
            // error="Project Description is Required"
          >
            <Textarea id="formDescription" />
          </InputWrapper>
        </Grid.Col>
        <Grid.Col>
          <Switch label="Enable Email Confirmation" />
        </Grid.Col>
        <Grid.Col>
          <InputWrapper
            id="templateID"
            required
            label="Email Template"
            description="Please Select Suitable Email Template to Send in Response to the Data Submission"
            error="Template is Required"
          >
            <Select
              id="templateID"
              searchable
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
}


const FormConfiguration: React.FC = () => {
  const [origins,setOrigins]=useState(["http://localhost:3000","http://web.dev"])
  return (
    <Grid>
      <Grid.Col>
        <InputWrapper
          id="origin"
          label="Origins"
          description="Please Enter a the Allowed Origins and Hit Enter (on Default all the origins are allowed)"
        >
          <Input
            id="origin"
            onKeyDown={(element: KeyboardEvent<HTMLInputElement>) => {
              if (element.code === 'Enter') {
                origins.push(element.target!.value);
                element.target.value = '';
                setOrigins([...origins]);
              }
            }}
          />
        </InputWrapper>
        <div style={{ marginTop: '1rem' }}>
          {origins.map((origin, index) => (
            <Badge
              className="badge"
              rightSection={
                <Cross1Icon
                  onClick={() => {
                    setOrigins([
                      ...origins.filter(
                        (value, originIndex) => index != originIndex
                      ),
                    ]);
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
        >
          <Input
            id="redirectURL"
            onKeyDown={(element: KeyboardEvent<HTMLInputElement>) => {
              if (element.code === 'Enter') {
                origins.push(element.target!.value);
                element.target.value = '';
                setOrigins([...origins]);
              }
            }}
          />
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
        <SimpleGrid cols={2} style={{width:"85%",margin:"auto",marginTop:".8rem"}}>
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