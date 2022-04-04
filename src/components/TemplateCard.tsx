import { useToast } from '@chakra-ui/react';
import { ActionIcon, Button, Card, Grid, Modal, Text } from '@mantine/core';
import { Pencil1Icon } from '@modulz/radix-icons';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteTemplateMutation } from '../redux/api/template';
import { setCurrentProject } from '../redux/reducer/routes';
import NewTemplate from './NewTemplate';

type TemplateCardProps = {
  id: string;
  name: string;
  type: "User" | "Default",
  template: string;
  refetch: Function;
};

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  template,
  type,
  refetch
}) => {
  const [open, setOpen] = useState(false);
  const [opType, setOpType] = useState("update")
  const [deleteTemplate, { isLoading, isSuccess }] = useDeleteTemplateMutation();

  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast({ title: "Template Deleted", status: "success" });
      refetch();
    }
  },[isSuccess])
  return (
    <>
      <Modal
        size={opType == 'update' ? 'xl' : 'md'}
        opened={open}
        onClose={() => setOpen(false)}
      >
        {opType == 'update' ? (
          <NewTemplate
            data={{ name, template, id }}
            type="Update"
            successCallback={() => {
              setOpen(false);
              refetch()
            } }
          />
        ) : (
          <>
            <Text>Do you wish to Delete the Template</Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                marginTop: '1rem',
              }}
            >
              <Button onClick={()=>deleteTemplate(id)} color="red">Yes,Delete</Button>
            </div>
          </>
        )}
      </Modal>
      <Card
        onClick={() => {}}
        style={{
          margin: '1rem auto',
          padding: '2rem',
          border: '1px solid #eeee',
          height: '260px',
          maxHeight: '260px',
          minHeight: '260px',
          width: '360px',
        }}
        shadow="md"
        sx={(theme) => ({
          '&:hover': {
            boxShadow: `0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 36px 28px -7px, rgb(0 0 0 / 4%) 0px 17px 17px -7px`,
            cursor: 'pointer',
          },
        })}
      >
        <Text size="xl" align="left" color="teal">
          {name}
        </Text>
        <Card.Section>
          <div style={{ height: '140px' }}></div>
        </Card.Section>
        <Card.Section>
          <Grid
            mr={20}
            style={{ display: 'flex', justifyContent: 'right', gap: '1rem' }}
          >
            <ActionIcon
              onClick={() => {
                setOpen(true);
                setOpType('update');
              }}
              disabled={type === 'Default'}
              size="lg"
              variant="light"
              color="teal"
            >
              <Pencil1Icon />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                setOpen(true);
                setOpType('delete');
              }}
              disabled={type === 'Default'}
              size="lg"
              variant="light"
              color="teal"
            >
              <RiDeleteBin2Fill />
            </ActionIcon>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
};

export default TemplateCard;
