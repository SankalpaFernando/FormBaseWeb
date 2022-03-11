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

const Stats: React.FC = () => {
  const { data:dataSet, isLoading:isDataSetLoading } = useGetDataSetInfoQuery({});
  const { data:forms, isLoading:isFormsLoading } = useGetFormInfoQuery({});
  const { data:projects, isLoading:isProjectsLoading } = useGetProjectInfoQuery({});

  return (
    <Grid>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatsCard
          label="Projects"
          stats={projects?.data?.projectCount}
          Icon={AiOutlineFundProjectionScreen}
        />
      </Grid.Col>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatsCard
          label="Forms"
          stats={forms?.data?.formCount}
          Icon={ClipboardIcon}
        />
      </Grid.Col>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatsCard
          label="Datasets"
          stats={dataSet?.data?.dataSetCount}
          Icon={DiDatabase}
        />
      </Grid.Col>
      <Grid.Col xs={6} md={6} lg={3}>
        <StatsCard label="Backups" stats="5" Icon={GiServerRack} />
      </Grid.Col>
    </Grid>
  );
}

type StatsCardProps = {
  label: string;
  stats: string;
  Icon: React.FC;
}

const StatsCard: React.FC<StatsCardProps> = ({label,stats,Icon}) => {
  return (
    <Card style={{ width: '100%',margin:"auto"}} shadow="xl" padding="xl" radius="lg">
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr"}}>
        <div>
          <Text
            align="left"
            style={{ fontSize: '1.4rem', fontFamily: 'Fredoka' }}
          >
            {label}
          </Text>
          <Text
            align="left"
            style={{ fontSize: '2.4rem', lineHeight: '2.4rem' }}
          >
            {stats}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <ThemeIcon
            variant="light"
            style={{ width: 80, height: 80, borderRadius: '50%' }}
          >
            <Icon width={40} height={40} style={{fontSize:"3rem"}} />
          </ThemeIcon>
        </div>
      </div>
    </Card>
  );
}


export default Stats