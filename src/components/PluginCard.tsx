// @ts-nocheck

import { Box, Button, Grid, Select, Text } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import OauthPopup from 'react-oauth-popup';
import axios from 'axios';
import { useModals } from '@mantine/modals';
import '../styles/components.scss';
import { useToast } from '@chakra-ui/react';

type PluginCardProps = {
  icon: string;
  name: String;
  description: String;
  formID: string;
  callback: Function;
  activated: boolean;
};

const PluginCard: React.FC<PluginCardProps> = ({
  icon,
  name,
  description,
  formID,
  callback,
  activated,
}) => {
  const [active, setActive] = useState(false);
  const [documentId, setDocumentID] = useState<string>();
  const modals = useModals();
  const toast = useToast();
  const onAuthCode = async (code: string) => {
    const baseURL = `${import.meta.env.VITE_API}/plugin`;
    try {
      axios.defaults.withCredentials = true;
      axios
        .get(`${baseURL}/google/code?code=${code}`)
        .then((res) => res.data)
        .then((data) => {
          axios
            .post(`${baseURL}/add?formID=${formID}`, {
              access_token: data.access_token,
              refresh_toke: data.refresh_token,
              name,
            })
            .then(() => {
              axios
                .get(`${baseURL}/sheet/${formID}`)
                .then((res) => res.data)
                .then((data) => {
                  console.log(data);
                  modals.openConfirmModal({
                    title: 'Select A SpreadSheet',
                    children: (
                      <Select
                        onChange={(value) => setDocumentID(value)}
                        data={data.files.map(
                          (entry: { id: string; name: string }) => ({
                            value: entry.id,
                            label: entry.name,
                          })
                        )}
                      />
                    ),
                    labels: { confirm: 'Confirm', cancel: 'Cancel' },
                    onCancel: () => console.log('Cancel'),
                    onConfirm: () => {
                      axios
                        .put(
                          `${baseURL}/sheet/${formID}`,
                          {
                            sheetID: documentId,
                          },
                          { withCredentials: true }
                        )
                        .then((res) => {
                          modals.closeAll();
                          toast({
                            title: 'Plugin Successfully Added',
                            status: 'success',
                          });
                          callback();
                        });
                    },
                  });
                });
            });
        });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box
      className="plugin-card"
      sx={(theme) => ({
        border: `${
          active
            ? `3px solid ${theme.colors[theme.primaryColor][5]}`
            : '2px solid #868e96'
        }`,
        transition: '1s',
        '&:hover': {
          borderColor: theme.colors[theme.primaryColor][5],
        },
      })}
    >
      <div className="plugin-img">
        <img width={45} height={45} src={icon} />
      </div>
      <div>
        <Text size="lg" align="center" my={8}>
          {name}
        </Text>
        <Text size="sm" color="#868e96" align="center">
          {description}
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem auto',
        }}
      >
        {activated ? (
          <>
            <Button>Revoke</Button>
          </>
        ) : (
          <>
            <OauthPopup
              url={`https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets&state=formID&response_type=code&client_id=825212325994-r4tngsvhg637e1kkkot7uin9jphd6plg.apps.googleusercontent.com&redirect_uri=${import.meta.env.VITE_CALLBACK_URL}%2Fgoogle%2Fredirect`}
              onCode={onAuthCode}
            >
              <Button>Authorize</Button>
            </OauthPopup>
          </>
        )}
      </div>
    </Box>
  );
};

export default PluginCard;
