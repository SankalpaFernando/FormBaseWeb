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
} from '@mantine/core';
import axios from 'axios';
import { isEmpty, startCase } from 'lodash';
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';
import { MdSavedSearch } from 'react-icons/md';
import { MdRefresh } from 'react-icons/md';
import {
  useDeleteEntryBulkMutation,
  useGetEntriesQuery,
} from '../redux/api/form';
import fileDownload from 'js-file-download';

type EntryTableDashboard = {
  formID: string;
};

const EntryTable: React.FC<EntryTableDashboard> = ({ formID }) => {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteEntries, { isLoading, isSuccess }] =
    useDeleteEntryBulkMutation();
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const { data, refetch } = useGetEntriesQuery({ formID, page });

  const onDeleteCheck = async (
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let tempIds = [...deleteIds];
    if (!e.target.checked) {
      tempIds = tempIds.filter((val: string) => val !== _id);
    } else {
      if (!tempIds.includes(_id)) {
        tempIds.push(_id);
      }
    }
    setDeleteIds([...tempIds]);
  };

  const onDownload = () => {
    axios(`${import.meta.env.VITE_API}/form/download/dataset/${formID}`, {
      withCredentials: true,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/csv',
      },
    }).then(({ data }) => {
      fileDownload(
        data,
        `dataset-${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`
      );
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);
  const onDelete = () => {
    const body = { entryIDs: [...deleteIds] };
    deleteEntries(body);
    setDeleteIds([]);
    setDialogOpen(false);
  };
  return (
    <div style={{ width: '70%', margin: '1rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <ActionIcon onClick={refetch} size="md">
          <MdRefresh />
        </ActionIcon>
      </div>
      <Modal size="sm" opened={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Text>
          Do you wish to Delete {deleteIds.length} Entries from your form?
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginTop: '1rem',
          }}
        >
          <Button color="red" onClick={onDelete}>
            Yes,Delete
          </Button>
        </div>
      </Modal>
      <Modal size="xl" opened={open} onClose={() => setOpen(false)}>
        <Grid>
          <Grid.Col>
            <InputWrapper label="Subject" description="Subject of the Email">
              <Input />
            </InputWrapper>
          </Grid.Col>
          <Grid.Col>
            <InputWrapper
              label="Email Template"
              description="EJS Email Template"
            >
              <Textarea autosize minRows={10} />
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
              <Button loading={isLoading}>Send Email</Button>
            </div>
          </Grid.Col>
        </Grid>
      </Modal>
      <Table mt={10} variant="unstyled">
        <Thead>
          <Tr>
            <Th width="5%"></Th>
            <Th width="2%"></Th>
            <Th color="GrayText" width="20%" fontSize={15}>
              Date
            </Th>
            <Th color="GrayText" fontSize={15}>
              Data
            </Th>
          </Tr>
        </Thead>
        {data?.docs.map(({ data, _id }) => (
          <DetailCard
            onDeleteCheck={(
              _id: string,
              e: React.ChangeEvent<HTMLInputElement>
            ) => onDeleteCheck(_id, e)}
            deleteChecked={deleteIds.includes(_id)}
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
        <Button onClick={onDownload} color="green" variant="outline" mr={10}>
          Download Dataset
        </Button>
        {!isEmpty(deleteIds) && (
          <Button
            onClick={() => setDialogOpen(true)}
            color="red"
            variant="outline"
          >
            Delete Selection of {deleteIds.length} rows
          </Button>
        )}
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
  deleteChecked: boolean;
  onDeleteCheck: Function;
};

const DetailCard: React.FC<DetailCardProps> = ({
  data,
  _id,
  deleteChecked,
  onDeleteCheck,
}) => {
  const [collapse, setCollapse] = useState(true);
  const date = moment(new Date(parseInt(_id.substring(0, 8), 16) * 1000));
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
              checked={deleteChecked}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onDeleteCheck(_id, e)
              }
            />
          </Td>
          <Td style={{ border: '2px solid #eee', borderLeft: '0' }}>
            {date.format('MMMM DD')}
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
              <b>Date</b>
              <div style={{ margin: '2rem 0' }}>
                <p>{date.format('YYYY MMMM DD HH:mm:ss')}</p>
              </div>
            </Td>
            <Td>
              <b>Data</b>
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

export default EntryTable;
