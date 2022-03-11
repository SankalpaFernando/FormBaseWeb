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
import {FaChrome,FaApple,FaWindows,FaSafari,FaFirefox,FaLinux } from "react-icons/fa"
import { Card, Pagination, Text, useMantineTheme } from '@mantine/core';
import "../styles/components.scss";
const RecentActivity: React.FC = () => {
  const theme = useMantineTheme();
  const color = theme.colors[theme.primaryColor.toString()][4];
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
            <Th fontSize=".9rem">Browser</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr className="tableRow">
            <Td style={{ color: '#8f8f8f' }}>621b6ece1044999257717777</Td>
            <Td>2022-01-01 16:00:01</Td>
            <Td>
              <FaLinux fontSize="1.5rem" />
            </Td>
            <Td style={{ display: 'flex', justifyContent: 'center' }}>
              <FaFirefox fontSize="1.5rem" />
            </Td>
          </Tr>
          <Tr>
            <Td style={{ color: '#8f8f8f' }}>621b6ece1044999257717451</Td>
            <Td>2022-01-02 4:00:01</Td>
            <Td>
              <FaWindows fontSize="1.5rem" color={color} />
            </Td>
            <Td style={{ display: 'flex', justifyContent: 'center' }}>
              <FaChrome fontSize="1.5rem" color={color}  />
            </Td>
          </Tr>
          <Tr>
            <Td style={{ color: '#8f8f8f' }}>621b6ece1044999257717410</Td>
            <Td>2022-01-02 16:00:01</Td>
            <Td>
              <FaApple fontSize="1.5rem" />
            </Td>
            <Td style={{ display: 'flex', justifyContent: 'center' }}>
              <FaSafari fontSize="1.5rem" />
            </Td>
          </Tr>
          <Tr>
            <Td style={{ color: '#8f8f8f' }}>621b6ece1044999257717410</Td>
            <Td>2022-01-02 16:00:01</Td>
            <Td>
              <FaApple fontSize="1.5rem" />
            </Td>
            <Td style={{ display: 'flex', justifyContent: 'center' }}>
              <FaSafari fontSize="1.5rem" />
            </Td>
          </Tr>
          <Tr>
            <Td style={{ color: '#8f8f8f' }}>621b6ece1044999257717410</Td>
            <Td>2022-01-02 16:00:01</Td>
            <Td>
              <FaApple fontSize="1.5rem" />
            </Td>
            <Td style={{ display: 'flex', justifyContent: 'center' }}>
              <FaSafari fontSize="1.5rem" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '1rem 0',
        }}
      >
        <Pagination total={1} />
      </div>
    </Card>
  );
}

export default RecentActivity