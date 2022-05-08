
import {
  Badge,
  Button,
  Grid,
  Modal,
  Pagination,
  Text,
  Card,
  InputWrapper,
  Input,
  Tabs,
  Image,
  RingProgress,
  ActionIcon
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header';
import NewProject from '../../components/NewProject';
import ProjectCard from '../../components/ProjectCard';
import { useGetProjectsQuery } from '../../redux/api/project';
import OauthPopup from 'react-oauth-popup';
import NewTemplate from '../../components/NewTemplate';
import { useGetTemplateQuery } from '../../redux/api/template';
import TemplateCard from '../../components/TemplateCard';
import { useGetCurrentUserQuery, useGetStatsByUserQuery } from '../../redux/api/info';
import { useForm } from '@mantine/form';
import { isEmpty } from 'lodash';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/user';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/reducer/routes';
import { useNavigate } from 'react-router-dom';
import { MdRefresh } from 'react-icons/md';

const Setting: React.FC = () => {
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    data: user,
    isLoading: isUserUpdateLoading
  } = useGetCurrentUserQuery({});
  const {
    data: stats,
    isLoading: isStatsLoading,
    refetch,
  } = useGetStatsByUserQuery({});
  const [updateUser,{isSuccess:isUserUpdateSuccess,data:updatedUser}] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isUserDeleteSuccess }] = useDeleteUserMutation();
  
  useEffect(() => {
    if (!isEmpty(user)) {
      form.setValues({ ...user });
    }
  }, [user])
  
  useEffect(() => {
    if (isUserUpdateSuccess) {
      dispatch(setCurrentUser({...updatedUser.data[0]}))
    }
  },[isUserUpdateSuccess])

  useEffect(() => {
    console.log("🚀 ~ file: Setting.tsx ~ line 64 ~ useEffect ~ isUserDeleteSuccess", isUserDeleteSuccess)
    if (isUserDeleteSuccess) {
      navigate("/login",{replace:false})
    }
    
  },[isUserDeleteSuccess])

  const form = useForm({
    initialValues: {
      name: "",
      email:"",
      photo:""
  }})

  const onUserUpdate = () => {
    if (!form.validate().hasErrors) {
      updateUser({ userID: user._id, data: { ...form.values } });
    }
  }

  const onDelete = () => {
    deleteUser({ userID: user._id });
  }
  return (
    <>
      <Modal
        size="sm"
        opened={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Delete the User"
      >
        <Text>Do you want to delete the Account ?</Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginTop: '1rem',
          }}
        >
          <Button color="red" onClick={onDelete}>
            Yes, Delete the Account
          </Button>
        </div>
      </Modal>
      <div>
        <Header title="Settings" />
        <Tabs
          onTabChange={refetch}
          orientation="vertical"
          style={{ width: '80%', margin: '3rem auto' }}
          variant="outline"
          styles={{ body: { width: '100%' }, tabsList: { width: '8rem' } }}
        >
          <Tabs.Tab label="User Info">
            <Card
              shadow="md"
              style={{
                width: '80%',
                margin: '1rem 0 0 2rem',
                padding: '2rem 4rem',
              }}
            >
              <InputWrapper
                style={{ textAlign: 'left' }}
                id="projectName"
                label="User Name"
                description="Please Enter User Name"
              >
                <Input id="projectName" {...form.getInputProps('name')} />
              </InputWrapper>
              <InputWrapper
                style={{ textAlign: 'left' }}
                id="projectName"
                label="User Email"
                mt={15}
                description="Please Enter User Email"
              >
                <Input id="projectName" {...form.getInputProps('email')} />
              </InputWrapper>
              <InputWrapper
                style={{ textAlign: 'left' }}
                id="projectName"
                mt={15}
                label="Profile Image URL"
                description="Please Enter Profile Image URL"
              >
                <Input id="projectName" {...form.getInputProps('photo')} />
              </InputWrapper>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  marginTop: '1.8rem',
                }}
              >
                <Button loading={isUserUpdateLoading} onClick={onUserUpdate}>
                  Save Changes
                </Button>
              </div>
            </Card>
          </Tabs.Tab>
          <Tabs.Tab label="Billing Info">
            <Card
              shadow="md"
              style={{
                width: '80%',
                margin: '1rem 0 0 2rem',
                padding: '2rem 4rem',
              }}
            >
              <div style={{display:"grid", gridTemplateColumns:"5fr 1fr"}}>
                <Text align="left" size="xl" weight="bold" color="gray">
                  Plan
                </Text>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                  <ActionIcon onClick={refetch} size="md">
                    <MdRefresh />
                  </ActionIcon>
                </div>
              </div>
              <Text align="left" mt={10} color="gray">
                You are currently using{' '}
                <Badge size="md">{user?.planID?.name}</Badge> plan.{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {!isUserUpdateLoading &&
                    (user?.planID?.price === 0
                      ? 'Free of Charge'
                      : `$${user?.planID?.price} per month`)}
                </span>
              </Text>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:"1fr 1fr 1fr 1fr",
                  gap: '1rem',
                  margin: '2rem auto',
                }}
              >
                <PackageProgress
                  title="Total Disk Usage"
                  total={
                    isUserUpdateLoading
                      ? 0
                      : Math.round(user?.planID?.size / 1000000)
                  }
                  current={
                    isStatsLoading
                      ? 0
                      : Math.round(stats?.data?.stats?.size / 1000000)
                  }
                  metrics="MB"
                />
                <PackageProgress
                  title="Total Writes"
                  total={isUserUpdateLoading ? 0 : user?.planID?.writes}
                  current={
                    isStatsLoading ? 0 : Math.round(stats?.data?.stats?.writes)
                  }
                />
                <PackageProgress
                  title="Total Reads"
                  total={isUserUpdateLoading ? 0 : user?.planID?.reads}
                  current={
                    isStatsLoading ? 0 : Math.round(stats?.data?.stats?.reads)
                  }
                />
                <PackageProgress
                  title="Total Data Sets"
                  total={isUserUpdateLoading ? 0 : user?.planID?.count}
                  current={
                    isStatsLoading ? 0 : Math.round(stats?.data?.stats?.count)
                  }
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  marginTop: '1.8rem',
                }}
              >
                <Button>Upgrade the Plan</Button>
              </div>
            </Card>
          </Tabs.Tab>
          <Tabs.Tab label="Danger Zone">
            <Card
              shadow="md"
              style={{
                width: '80%',
                margin: '1rem 0 0 2rem',
                padding: '2rem 4rem',
              }}
            >
              <Text size="xl" align="left" color="red">
                Danger Zone
              </Text>
              <Text align="justify" color="gray" mt={15}>
                Be sure to backup any data before to proceed any operation in
                the bottom. Deleting the Account will cause removing the backups
                as well.
              </Text>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  marginTop: '1.8rem',
                  gap: '1rem',
                }}
              >
                <Button
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                  color="red"
                >
                  Delete the Account
                </Button>
              </div>
            </Card>
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
};

type PackageProgressProps = {
  title: string;
  total: number;
  current: number;
  metrics?:string
}

const PackageProgress: React.FC<PackageProgressProps> = ({ title, total, current,metrics }) => {
  const percentage = (current / total) * 100;
  let color = "teal";
  if (percentage > 80) {
    color="red"
  } else if (percentage > 50) {
    color="yellow"
  } else if (percentage > 30) {
    color="green"
  }
  return (
    <div>
      <Text color="gray" weight="bold">
        {title}
      </Text>

      <RingProgress
        size={180}
        thickness={12}
        roundCaps
        sections={[{ value: percentage, color }]}
        label={
          <Text color="gray">
            {current} {metrics} /{' '}
            <span style={{ fontWeight: 'bold' }}>
              {total} {metrics}
            </span>
          </Text>
        }
      />
    </div>
  );
}



export default Setting;
