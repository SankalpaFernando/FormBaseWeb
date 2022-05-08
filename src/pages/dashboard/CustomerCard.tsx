// @ts-nocheck

import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Input,
  NumberInput,
  Radio,
  SimpleGrid,
  Text,
} from '@mantine/core';
import axios from 'axios';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../resources/bg.png';
import { Check } from 'tabler-icons-react';
import * as icon from '../../resources/';
import { useForm } from '@mantine/form';
import { useCreateFreeSubscriptionMutation } from '../../redux/api/payment';
import { setCurrentUser, setIsAuthenticated } from '../../redux/reducer/routes';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

type CardType = 'master' | 'visa' | 'americanExpress' | '';

const CustomerCard: React.FC = () => {
  const [formType, setFormType] = useState('plan');
  const dispatch = useDispatch();
  const [createFreeSubscription] = useCreateFreeSubscriptionMutation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API}/auth/user`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        dispatch(setCurrentUser({ ...data }));
        if (!isEmpty(data.name)) {
          dispatch(setIsAuthenticated(true));
        }
      });
  }, []);

  const currentUser = useSelector(
    (state: RootState) => state.route.currentUser
  );

  const onPlanNext = (type: string) => {
    if (type === 'free') {
      createFreeSubscription({ userID: currentUser._id }).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5rem auto',
      }}
    >
      <Card
        shadow="lg"
        padding="xl"
        style={{ padding: '4rem', width: '30%' }}
        radius="md"
      >
        <Text
          size="xl"
          style={{ fontSize: '2.78rem', fontFamily: 'Rajdhani' }}
          m={20}
          color="gray"
          align="center"
        ></Text>

        {formType === 'payment' ? (
          <Payment onNext={() => {}} onBack={() => setFormType('plan')} />
        ) : (
          <PaymentPlan onNext={(type) => onPlanNext(type)} />
        )}
      </Card>
    </div>
  );
};

type PaymentProps = {
  onNext: Function;
  onBack: Function;
};

const Payment: React.FC<PaymentProps> = ({ onNext, onBack }) => {
  const [cardType, setCardType] = useState<CardType>('');

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      cvv: '',
      expiryDate: '',
      cardNumber: '',
    },
  });

  const onCardNumberChange = (cardNumber: number) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber);
    const masterRegex =
      /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/.test(
        cardNumber
      );
    const americanExpressRegex = /^3[47][0-9]{5,}$/.test(cardNumber);

    setCardType(
      visaRegex
        ? 'visa'
        : masterRegex
        ? 'master'
        : americanExpressRegex
        ? 'americanExpress'
        : ''
    );
  };
  return (
    <>
      <div>
        <Divider label="Customer Details" labelProps={{ size: 'lg' }} my={20} />
        <SimpleGrid cols={2}>
          <Input
            size="md"
            placeholder="First Name"
            {...form.getInputProps('firstName')}
          />
          <Input
            size="md"
            placeholder="Last Name"
            {...form.getInputProps('lastName')}
          />
        </SimpleGrid>
        <Input
          my={20}
          size="md"
          placeholder="Company Name"
          {...form.getInputProps('companyName')}
        />
        <Input
          my={20}
          size="md"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <Input
          my={20}
          size="md"
          placeholder="Phone Number"
          {...form.getInputProps('phoneNumber')}
        />
      </div>
      <div>
        <Divider label="Card Details" labelProps={{ size: 'lg' }} my={20} />
        <NumberInput
          onChange={onCardNumberChange}
          my={20}
          size="md"
          placeholder="Card Number"
          type="number"
          maxLength={13}
          minLength={12}
          rightSection={
            <div style={{ marginLeft: '.2rem', width: '2rem' }}>
              <img src={icon[cardType]} />
            </div>
          }
          rightSectionWidth={50}
          {...form.getInputProps('cardNumber')}
        />
        <SimpleGrid cols={2}>
          <NumberInput
            hideControls
            size="md"
            placeholder="CVV"
            maxLength={3}
            {...form.getInputProps('cvv')}
          />
          <Input
            size="md"
            type="month"
            placeholder="MM/YY"
            {...form.getInputProps('expiryDate')}
          />
        </SimpleGrid>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', gap: '1rem' }}>
        <Button mt={20} onClick={onBack} variant="light">
          Back to Payment Plan
        </Button>
        <Button mt={20} onClick={onNext} variant="light">
          Complete Checkout
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
          flexDirection: 'column',
        }}
      >
        <Text mb={10}>Powered By</Text>
        <img
          src="https://s3.amazonaws.com/braintree-badges/braintree-badge-dark.png"
          width="164px"
          height="44px"
        />
      </div>
    </>
  );
};

type PaymentPlanProps = {
  onNext: Function;
  onBack: Function;
};

const PaymentPlan: React.FC<PaymentPlanProps> = ({ onNext }) => {
  const [planID, setPlanID] = useState('');
  return (
    <>
      <PlanCard
        name="Tester"
        description="This plan is for testing purposes with <b>Limited Resources</b> and <b>No Credit Card Required</b>"
        price={0}
        selected={planID === 'free'}
        planID="free"
        onSelected={setPlanID}
      />
      <PlanCard
        name="Developer"
        description="This plan is for developing purpose with <b>Limited Datasets</b> and <b>Higher reads and writes</b>"
        price={1}
        selected={planID === 'c3pm'}
        onSelected={setPlanID}
        planID="c3pm"
      />

      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Button mt={20} onClick={() => onNext(planID)} variant="light">
          {planID === 'free'
            ? "Let's Kick of Your Journey"
            : 'Next, Choose the Payment Plan'}
        </Button>
      </div>
    </>
  );
};

type PlanCardProps = {
  name: string;
  description: string;
  price: number;
  selected: boolean;
  onSelected: (planID: string) => void;
  planID: string;
};

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  description,
  price,
  selected,
  onSelected,
  planID,
}) => {
  const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelected(planID);
    }
  };

  return (
    <Card>
      <div style={{ display: 'flex', gridTemplateColumns: '1fr 2fr 1fr' }}>
        <Radio
          checked={selected}
          onChange={onCheck}
          mt={5}
          style={{ display: 'flex', alignItems: 'start' }}
        />
        <div style={{ paddingTop: '0rem' }}>
          <Text
            color="gray"
            size="xl"
            mb={10}
            style={{ fontWeight: 'bold' }}
            align="left"
          >
            {name} Plan
          </Text>
          <Text
            color="gray"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            align="left"
            style={{ width: '350px' }}
          ></Text>
        </div>
        <Text>${price}</Text>
      </div>
    </Card>
  );
};

export default CustomerCard;
