import React from 'react'
import { Card, Grid, Text, ThemeIcon } from '@mantine/core'
import {
  ArchiveIcon,
  BarChartIcon,
  ClipboardIcon,
  DashboardIcon,
  FileTextIcon,
  LayersIcon,
  BackpackIcon
} from '@modulz/radix-icons';

import { DiDatabase } from "react-icons/di"
import { GiServerRack } from "react-icons/gi"
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { useGetDataSetInfoQuery, useGetFormInfoQuery, useGetProjectInfoQuery } from '../redux/api/info';
import StatCard from './StatCard';

const Stats: React.FC = () => {
  const { data:dataSet, isLoading:isDataSetLoading } = useGetDataSetInfoQuery({});
  const { data:forms, isLoading:isFormsLoading } = useGetFormInfoQuery({});
  const { data:projects, isLoading:isProjectsLoading } = useGetProjectInfoQuery({});

  return (
    <Grid>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatCard
          label="Projects"
          stats={projects?.data?.projectCount}
          Icon={AiOutlineFundProjectionScreen}
        />
      </Grid.Col>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatCard
          label="Forms"
          stats={forms?.data?.formCount}
          Icon={ClipboardIcon}
        />
      </Grid.Col>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatCard
          label="Datasets"
          stats={dataSet?.data?.dataSetCount}
          Icon={DiDatabase}
        />
      </Grid.Col>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatCard label="Backups" stats="5" Icon={GiServerRack} />
      </Grid.Col>
    </Grid>
  );
}


export default Stats