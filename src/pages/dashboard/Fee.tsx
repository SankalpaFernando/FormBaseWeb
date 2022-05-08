import { ActionIcon, Button, Card, Radio, Text } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../resources/bg.png';
import { Check } from 'tabler-icons-react';
const Fee: React.FC = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const onAuth = () => {
    window.location.href = `${import.meta.env.VITE_API}/auth`;
  };
  const [selected, setSelected] = useState(0);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5rem auto',
      }}
    >
      <Card shadow="lg" padding="xl" style={{ padding: '4rem' }} radius="md">
        <Text
          size="xl"
          style={{ fontSize: '2.78rem', fontFamily: 'Rajdhani' }}
          m={20}
          color="gray"
          align="center"
        >
          Payment Plan
        </Text>
        <div>
          <PaymentCard
            name="Tester"
            description="This plan is for testing purposes with <b>Limited Resources</b> and <b>Free of Charge</b>"
            price={0}
            dataset={[
              '1 Project',
              '20 Datasets',
              '1MB Data Storage',
              '100 Writes/Month',
              '100 Reads/Month',
            ]}
            selected={selected === 0}
            onClick={() => setSelected(0)}
          />
          <PaymentCard
            name="Developer"
            description="This plan is for developing purpose with <b>Limited Datasets</b> and <b>Higher reads and writes</b>"
            price={1}
            dataset={[
              '2 Projects',
              '100 Datasets',
              '5MB Data Storage',
              '1000 Writes/Month',
              '1000 Reads/Month',
            ]}
            selected={selected === 1}
            onClick={() => setSelected(1)}
          />
          <PaymentCard
            name="Portfolio"
            description="This plan is for use for personal projects with <b>More Data Storage Size, Reads and Writes</b>"
            price={10}
            dataset={[
              '4 Projects',
              '1000 Datasets',
              '150MB Data Storage',
              '5000 Writes/Month',
              '5000 Reads/Month',
            ]}
            selected={selected === 2}
            onClick={() => setSelected(2)}
          />
          <PaymentCard
            name="Community"
            description="This plan is for use for community projects that has multiple projects with <b>Higher Storages, Writes and Reads</b>"
            price={30}
            dataset={[
              '8 Projects',
              '20k Datasets',
              '4GB Data Storage',
              '50k Writes/Month',
              '50k Reads/Month',
            ]}
            selected={selected === 3}
            onClick={() => setSelected(3)}
          />
        </div>
      </Card>
    </div>
  );
};

type PaymentCardProps = {
  name: string;
  description: string;
  price: number;
  dataset: string[];
  selected: boolean;
  onClick: Function;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  name,
  description,
  price,
  dataset,
  selected,
  onClick
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        ':hover': {
          cursor: 'pointer',
          boxShadow:
            '0 8px 8px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 28px 23px -7px, rgb(0 0 0 / 4%) 0px 12px 12px -7px',
        },
      }}
      shadow="lg"
      radius="md"
      padding="xl"
      style={{ padding: '1.8rem', width: '35rem', ...(selected && { border: '3px solid #3ab886' }) }}
      my={20}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr' }}>
        <div>
          <Text
            size="xl"
            style={{
              fontSize: '1.6rem',
              fontFamily: 'Fredoka',
              fontWeight: 'bold',
            }}
            align="left"
            color="gray"
          >
            {name} Plan
          </Text>
          <Text
            mt={10}
            size="sm"
            color="gray"
            align="left"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Text>
        </div>
        <Text style={{ fontSize: '1.4rem', marginRight: '1rem' }} align="right">
          ${price}
        </Text>
      </div>
      <div
        style={{
          marginTop: '.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '.8rem',
        }}
      >
        {dataset.map((data) => (
          <div style={{ display: 'flex', gap: '.5rem', margin: '.8rem 0' }}>
            <ActionIcon variant="filled" color="teal" radius="xl" size="sm">
              <Check />
            </ActionIcon>
            <Text>{data}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Fee;
