// @ts-nocheck
import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Tfoot,
  toast,
  useToast,
} from '@chakra-ui/react';
import {
  ActionIcon,
  Button,
  Checkbox,
  Grid,
  Input,
  InputWrapper,
  Modal,
  Pagination,
  Text,
  Textarea,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { isEmpty, startCase } from 'lodash';
import * as moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';
import { MdSavedSearch } from 'react-icons/md';
import {
  useDeleteEntryBulkMutation,
  useGetEmailEntriesQuery,
  useGetEntriesQuery,
  useSendEmailAllMutation,
  useSendEmailIdsMutation,
} from '../redux/api/form';
import { Check, X } from 'tabler-icons-react';
import { v4 as uuid } from 'uuid';
import fileDownload from 'js-file-download';
import axios from 'axios';

type EntryTableDashboard = {
  formID: string;
};

const EmailTable: React.FC<EntryTableDashboard> = ({ formID }) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [emailIds, setEmailIds] = useState([]);
  const loadingRef = useRef<any>();
  const [
    sendEmailAll,
    { isSuccess: isSendEmailAllSuccess, isLoading: isSendEmailAllLoading },
  ] = useSendEmailAllMutation();
  const [
    sendEmailIds,
    { isSuccess: isSendEmailIdsSuccess, isLoading: isSendEmailIdsLoading },
  ] = useSendEmailIdsMutation();
  const { data } = useGetEmailEntriesQuery({ formID, page });
  const toast = useToast();

  useEffect(() => {
    if (isSendEmailAllSuccess || isSendEmailIdsSuccess) {
      if (loadingRef.current) {
        toast.close(loadingRef.current);
        toast({
          render: () => (
            <Notification
              color="green"
              icon={<Check size={18} />}
              onClose={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              The Emails Have Been Delivered to Recipients
            </Notification>
          ),
        });
      }
    }
  }, [isSendEmailAllSuccess, isSendEmailIdsSuccess]);
  const form = useForm({
    initialValues: {
      subject: '',
      template: '',
    },
    validate: {
      subject: (value) =>
        isEmpty(value) ? "Email's Subject is should not be empty" : null,
      template: (value) =>
        isEmpty(value) ? 'Template is should not be empty' : null,
    },
  });

  const onSend = () => {
    if (!form.validate().hasErrors) {
      if (isEmpty(emailIds)) {
        sendEmailAll({ formID, body: { ...form.values } });
      } else {
        sendEmailIds({ formID, body: { ...form.values, ids: emailIds } });
      }
      setOpen(false);
      toast({
        render: () => (
          <Notification
            color="green"
            icon={<Check size={18} />}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            Email Sending Has Been Queued
          </Notification>
        ),
      });
      loadingRef.current = toast({
        duration: null,
        position: 'top-right',
        render: () => (
          <Notification
            loading
            color="green"
            icon={<Check size={18} />}
            title="Sending Emails to the Recipients"
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            Will Notified Upon Completion
          </Notification>
        ),
      });
      form.reset();
    }
  };
  const onDownload = () => {
    axios(`${import.meta.env.VITE_API}/form/download/email/${formID}`, {
      withCredentials: true,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/csv',
      },
    }).then(({ data }) => {
      fileDownload(
        data,
        `emailList-${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`
      );
    });
  };

  const onEmailCheck = async (
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('I got Called');
    let tempIds = [...emailIds];
    if (!e.target.checked) {
      tempIds = tempIds.filter((val: string) => val !== _id);
    } else {
      if (!tempIds.includes(_id)) {
        tempIds.push(_id);
      }
    }
    setEmailIds([...tempIds]);
  };
  return (
    <div style={{ width: '70%', margin: '1rem auto' }}>
      <Modal size="xl" opened={open} onClose={() => setOpen(false)}>
        <Grid>
          <Grid.Col>
            <InputWrapper
              label="Subject"
              description="Subject of the Email"
              error={form.errors.subject}
            >
              <Input {...form.getInputProps('subject')} />
            </InputWrapper>
          </Grid.Col>
          <Grid.Col>
            <InputWrapper
              label="Email Template"
              description="EJS Email Template"
            >
              <Textarea
                autosize
                minRows={10}
                {...form.getInputProps('template')}
                error={form.errors.template}
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
              <Button
                loading={isSendEmailAllLoading || isSendEmailIdsLoading}
                onClick={onSend}
              >
                Send Email
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </Modal>
      <Table mt={20} variant="unstyled">
        <Thead>
          <Tr>
            <Th width="5%"></Th>
            <Th width="2%"></Th>

            <Th color="GrayText" fontSize={15}>
              Email Recipients
            </Th>
          </Tr>
        </Thead>
        {data?.docs.map(({ data, _id }) => (
          <DetailCard
            onEmailCheck={(
              _id: string,
              e: React.ChangeEvent<HTMLInputElement>
            ) => onEmailCheck(_id, e)}
            emailChecked={emailIds.includes(_id.toString())}
            _id={_id}
            data={data}
          />
        ))}
      </Table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginTop: '2rem',
        }}
      >
        <Button
          onClick={() => setOpen(true)}
          color="teal"
          variant="outline"
          mr={10}
        >
          Send Email
        </Button>
        <Button color="teal" variant="filled" mr={10} onClick={onDownload}>
          Download Email List
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '4rem 0',
        }}
      >
        <Pagination
          style={{ flexWrap: 'nowrap', WebkitFlexWrap: 'nowrap' }}
          total={data?.totalPages}
          size="lg"
          onChange={(page) => {
            setPage(page);
            // setDeleteIds([])
          }}
        />
      </div>
    </div>
  );
};

type DetailCardProps = {
  data: Object;
  _id: string;
  emailChecked: boolean;
  onEmailCheck: Function;
};

const DetailCard: React.FC<DetailCardProps> = ({
  data,
  _id,
  emailChecked,
  onEmailCheck,
}) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <>
      <Tbody>
        <Tr>
          <Td style={{ display: 'flex', justifyContent: 'right' }}>
            <ActionIcon size="lg" onClick={() => setCollapse(!collapse)}>
              {collapse ? (
                <IoMdArrowDropright size={20} />
              ) : (
                <IoMdArrowDropdown size={20} />
              )}
            </ActionIcon>
          </Td>
          <Td>
            <Checkbox
              checked={emailChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onEmailCheck(_id, e)
              }
            />
          </Td>
          <Td style={{ border: '2px solid #eee', borderRight: '0' }}>
            {JSON.stringify(data)
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll('"', '')
              .slice(0, 70) + '...'}
          </Td>
        </Tr>
      </Tbody>
      {!collapse && (
        <Tbody>
          <Tr style={{ width: '100%' }}>
            <Td></Td>
            <Td></Td>
            <Td>
              <b>Recipient</b>
              <div style={{ margin: '1rem 0' }}>
                {Object.keys(data).map((entryKey) => (
                  <div
                    style={{ display: 'flex', gap: '1rem', margin: '.5rem 0' }}
                  >
                    <Text>{startCase(entryKey)}</Text>
                    <Text color="gray">{data[entryKey]}</Text>
                  </div>
                ))}
              </div>
            </Td>
          </Tr>
        </Tbody>
      )}
    </>
  );
};

export default EmailTable;
