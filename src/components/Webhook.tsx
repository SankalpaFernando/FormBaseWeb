import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  createStyles,
  Dialog,
  Input,
  InputWrapper,
  Modal,
  Select,
  Table,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  useAddWebhookMutation,
  useDeleteWebhookMutation,
  useUpdateWebhookMutation,
} from '../redux/api/form';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { formObjectType } from '../utils/customTypes';
import { useToast } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type WebhookCreateProps = {
  formID: string;
  callback: Function;
  type?: 'Create' | 'Update';
  data?: {
    name: string;
    url: string;
    token: string;
    tokenType: string;
    tokenName: string;
    id: string;
  };
};

export const WebhookCreate: React.FC<WebhookCreateProps> = ({
  formID,
  callback,
  type = "Create",
  data
}) => {
  const [tokenVisible, setTokenVisible] = useState(false);
  const [addWebhook, { isLoading:isAddLoading, isSuccess:isAddSuccess }] = useAddWebhookMutation();
  const [updateWebhook, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useUpdateWebhookMutation();

  let initialValues = {
    name: '',
    token: '',
    tokenName: '',
    url: '',
    tokenType: '',
  };

  if (data) {
    initialValues = { ...data };
  }

  const form = useForm({
    initialValues,
    validate: {
      name: (value) =>
        isEmpty(value) ? 'Webhook Name should not be empty ' : null,
      url: (value) =>
        (isEmpty(value) ||
        ! (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(value))) ? 'Webhook Url should be a valid URL and should not be empty'
          : null,
      tokenName: (value) =>
        isEmpty(value)
          ? 'Webhook Access Token Name should not be empty '
          : null,
      tokenType: (value) =>
        isEmpty(value) ? 'Webhook Token Type should not be empty ' : null,
    },
  });

  const onSubmit = () => {
    if (!form.validate().hasErrors) {
      if (type == "Create") {
        addWebhook({ formID, body: { ...form.values } });
      } else {
        updateWebhook({ formID, webhookID: data?.id, body: { ...form.values } });
      }
    }
  };

  useEffect(() => {
    if (isAddSuccess || isUpdateSuccess) {
      callback();
    }
  }, [isAddSuccess,isUpdateSuccess]);

  return (
    <div>
      <InputWrapper
        style={{ textAlign: 'left' }}
        id="projectName"
        label="Webhook Name"
        description="Please Enter the Webhook Name"
        error={form.errors.name}
      >
        <Input id="name" {...form.getInputProps('name')} />
      </InputWrapper>
      <InputWrapper
        mt={10}
        style={{ textAlign: 'left' }}
        id="projectName"
        label="Webhook URL"
        description="Please Enter the URL for the Webhooks"
        error={form.errors.url}
      >
        <Input id="url" {...form.getInputProps('url')} />
      </InputWrapper>
      <InputWrapper
        style={{ textAlign: 'left' }}
        mt={10}
        id="projectName"
        label="Token Type"
        description="Please Select Token Type"
      >
        <Select
          data={[
            { value: 'URL', label: 'URL' },
            { value: 'HEADER', label: 'HEADER' },
          ]}
          {...form.getInputProps('tokenType')}
        />
      </InputWrapper>
      <InputWrapper
        style={{ textAlign: 'left' }}
        id="tokenName"
        mt={10}
        label="Token Name"
        description="Please Enter the Token Name in the URL or Header for the Webhook"
        error={form.errors.tokenName}
      >
        <Input id="projectName" {...form.getInputProps('tokenName')} />
      </InputWrapper>
      <InputWrapper
        style={{ textAlign: 'left' }}
        mt={10}
        id="projectName"
        label="Access Token"
        description="Please Select Plugins to Configure with Project"
      >
        <Input
          id="projectName"
          type={tokenVisible ?"":"password"}
          {...form.getInputProps('token')}
          rightSection={
            <ActionIcon onClick={()=>setTokenVisible(!tokenVisible)}>
              {tokenVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
            </ActionIcon>
          }
        />
      </InputWrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginTop: '1.8rem',
        }}
      >
        <Button loading={isAddLoading || isUpdateLoading} onClick={onSubmit}>
          {type} the Webhook
        </Button>
      </div>
    </div>
  );
};

type WebhookItems = {
  formObj: formObjectType;
  refetch: Function;
  formID: string;
};

export const WebhookItems: React.FC<WebhookItems> = ({
  formObj,
  refetch,
  formID,
}) => {
  const [open, setOpen] = useState(false);

  const onSuccessCallback = () => {
    refetch();
    setOpen(false);
  };

  return (
    <>
      <Modal size="lg" opened={open} onClose={() => setOpen(false)}>
        <WebhookCreate callback={onSuccessCallback} formID={formID} />
      </Modal>

      <Card
        shadow="md"
        style={{
          width: '95%',
          margin: '1rem 0 0 2rem',
          padding: '1rem 3rem 2rem 3rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'left' }}>
          <Button onClick={() => setOpen(true)}>Create a Webhook</Button>
        </div>
        <Table
          mt={40}
          verticalSpacing="lg"
          horizontalSpacing="lg"
          highlightOnHover
        >
          <thead>
            <tr>
              <td>Webhook Name</td>
              <td>URL</td>
              <td>Token Name</td>
              <td>Access Token</td>
              <td width="1%"></td>
              <td width="1%"></td>
            </tr>
          </thead>
          <tbody>
            {formObj.data[0].webhooks.map((webhook) => (
              <WebhookItem refetch={refetch} {...webhook} formID={formID} />
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

type WebhookItemProps = {
  name: string;
  url: string;
  tokenType: string;
  tokenName: string;
  formID: string;
  token: string;
  id: string;
  refetch: Function;
};

const WebhookItem: React.FC<WebhookItemProps> = ({
  name,
  url,
  tokenType,
  tokenName,
  formID,
  token,
  id,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const toast = useToast();
  const [deleteWebhook, { isSuccess }] = useDeleteWebhookMutation();
  const onDelete = () => {
    deleteWebhook({ formID, webhookID: id });
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast({ title: 'Webhook Deleted Successfully', status: 'success' });
    }
  }, [isSuccess]);

  const { classes } = createStyles((theme) => ({
    edit: {
      color: '#999',
      '&:hover': {
        color: theme.colors.teal[4],
      },
    },
    delete: {
      color: '#666',
      '&:hover': {
        color: theme.colors.red[4],
      },
    },
  }))();

  const onSuccessCallback = () => {
    refetch();
    setUpdateOpen(false);
    toast({ title: 'Webhook Updated Successfully', status: 'success' });
  };

  return (
    <>
      <Modal size="lg" opened={updateOpen} onClose={() => setUpdateOpen(false)}>
        <WebhookCreate
          data={{ name, url, tokenType, tokenName, token, id }}
          type="Update"
          callback={onSuccessCallback}
          formID={formID}
        />
      </Modal>
      <Modal
        size="sm"
        opened={open}
        onClose={() => setOpen(false)}
        title="Delete Webhook"
      >
        <Text>Do you want to remove this Webhook from the project ?</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginTop: '1rem',
          }}
        >
          <Button color="red" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Modal>
      <tr>
        <td>{name}</td>
        <td>{url}</td>
        <td>{tokenType}</td>
        <td>{tokenName}</td>
        <td>
          <BsFillPencilFill
            onClick={() => setUpdateOpen(true)}
            className={classes.edit}
            size={17}
          />
        </td>
        <td>
          <BsFillTrashFill
            onClick={() => setOpen(true)}
            className={classes.delete}
            size={17}
          />
        </td>
      </tr>
    </>
  );
};
