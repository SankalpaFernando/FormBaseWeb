import React from 'react';
import { Alert, Box, Code, Text } from '@mantine/core';
import PluginTab from '../../../resources/PluginTab.png';
import PluginCard from '../../../resources/PluginCard.png';
import SpreadSheet from '../../../resources/SpreadSheet.png';
import { Tag } from '@chakra-ui/react';
import {Prism} from "@mantine/prism";


const APIURL: React.FC = () => {


  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        API Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Basic Setup of API
      </Text>
      <Text align="left" color="gray" mt={10}>
        Formbase allows you to interact with the data using our rich API
        endpoints. You need to use access token which you can obtain as
        described in{' '}
        <a style={{ color: 'teal' }} href="#">
          here
        </a>
        . The base URL for the API is{' '}
        <Code>https://form-base.herokuapp.com/api</Code>
      </Text>
      <div></div>

      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Sending Data to the Formbase
      </Text>
      <Text align="left" color="gray" mt={30}>
        You can use a simple <Tag color="teal">POST</Tag> request to send the
        data as like follow
      </Text>
      <Box
        mt={20}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'left',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
        dangerouslySetInnerHTML={{
          __html: `<span style="color:#8a8e93">$</span> curl -X POST <br/> -H "Content-Type: application/json" \
    <span style="margin-left:2rem"><br/> -d '{"name": "John Doe", "email": "johndoe@example.com"}'</span> \
    <span><br/> https://form-base.herokuapp.com/api/your_access_token</span>`,
        }}
      ></Box>

      <Text
        align="left"
        color="gray"
        mt={20}
        weight="500"
        style={{ fontSize: '1.5rem' }}
      >
        Accessing Data from the Formbase
      </Text>
      <Text align="left" color="gray" mt={30}>
        You can use a simple <Tag color="teal">GET</Tag> request to send the
        data as like follow
      </Text>
      <Box
        mt={20}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'left',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
        dangerouslySetInnerHTML={{
          __html: `<span style="color:#8a8e93">$</span> curl -X GET <br/> -H "Content-Type: application/json" \
    <span style="margin-left:2rem"><br/>-H "Accept: application/json"</span> \
    <span><br/> https://form-base.herokuapp.com/api/your_access_token</span>`,
        }}
      ></Box>
    </>
  );
};
// curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://hostname/resource

export default APIURL;
