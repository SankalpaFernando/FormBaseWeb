import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { FaChrome, FaApple, FaWindows, FaSafari, FaFirefox, FaLinux, FaAndroid, FaInternetExplorer, FaEdge, FaOpera } from "react-icons/fa"
import { SiBrave} from "react-icons/si"
import { Card, Pagination, Text, useMantineTheme } from '@mantine/core';
import "../styles/components.scss";
import { useGetLatestLogQuery } from '../redux/api/info';
import moment from 'moment';
import { MdOutlineDisabledByDefault } from 'react-icons/md';
import { isEmpty } from 'lodash';
const RecentActivity: React.FC = () => {
  const theme = useMantineTheme();
  const color = theme.colors[theme.primaryColor.toString()][4];

  const {data:recentActivities,isLoading } = useGetLatestLogQuery({});



  return (
    <Card shadow="xl" radius="lg" padding="xl">
      <Text
        size="xl"
        align="left"
        style={{ fontSize: '1.6rem', fontFamily: 'Fredoka' }}
      >
        Recent Activity
      </Text>
      <Table style={{ marginTop: '1.2rem' }}>
        <Thead>
          <Tr>
            <Th fontSize=".9rem">ID</Th>
            <Th fontSize=".9rem">Date/Time</Th>
            <Th fontSize=".9rem">OS</Th>
            <Th fontSize=".9rem" align="center">
              Browser
            </Th>
          </Tr>
        </Thead>
        {isEmpty(recentActivities) && (
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td style={{ marginTop: '5rem', paddingTop: '3rem',paddingBottom:"3rem" }}>
              <Text color="gray" style={{ textAlign: 'center' }}>
                No Recent Activities Recorded
              </Text>
            </Td>
          </Tr>
        )}
        <Tbody>
          {!isLoading &&
            recentActivities.map(({ _id, device }) => {
              let os;
              let browser;

              switch (device?.os) {
                case 'GNU/Linux':
                  os = <FaLinux fontSize="1.5rem" />;
                  break;
                case 'Windows':
                  os = <FaWindows fontSize="1.5rem" />;
                  break;
                case 'Android':
                  os = <FaAndroid fontSize="1.5rem" />;
                  break;
                case 'iOS':
                  os = <FaApple fontSize="1.5rem" />;
                  break;
                case 'MAC':
                  os = <FaApple fontSize="1.5rem" />;
                  break;
                default:
                  os = <MdOutlineDisabledByDefault fontSize="1.5rem" />;
              }

              switch (device?.browser) {
                case 'Chrome':
                  browser = <FaChrome fontSize="1.5rem" />;
                  break;
                case 'Chrome Mobile':
                  browser = <FaChrome fontSize="1.5rem" />;
                  break;
                case 'Firefox':
                  browser = <FaFirefox fontSize="1.5rem" />;
                  break;
                case 'Internet Explorer':
                  browser = <FaInternetExplorer fontSize="1.5rem" />;
                  break;
                case 'Safari':
                  browser = <FaSafari fontSize="1.5rem" />;
                  break;
                case 'Microsoft Edge':
                  browser = <FaEdge fontSize="1.5rem" />;
                  break;
                case 'Opera':
                  browser = <FaOpera fontSize="1.5rem" />;
                  break;
                case 'Brave':
                  browser = <SiBrave fontSize="1.5rem" />;
                  break;
                default:
                  browser = <MdOutlineDisabledByDefault fontSize="1.5rem" />;
              }

              return (
                <Tr className="tableRow">
                  <Td style={{ color: '#8f8f8f' }}>{_id}</Td>
                  <Td>
                    {moment(
                      new Date(parseInt(_id.substring(0, 8), 16) * 1000)
                    ).format('YYYY-MM-DD HH:mm:ss')}
                  </Td>
                  <Td>{os}</Td>

                  <Td style={{ display: 'flex', justifyContent: 'center' }}>
                    {browser}
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '1.6rem 0',
        }}
      ></div>
    </Card>
  );
}

export default RecentActivity