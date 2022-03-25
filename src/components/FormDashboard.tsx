import { ActionIcon, Card, Grid, Group } from '@mantine/core'
import React, { useRef } from 'react'
import { DiDatabase } from 'react-icons/di';
import { MdRefresh } from 'react-icons/md';
import { useGetFormChartsQuery, useGetFormLogsQuery, useGetFormStatsQuery } from '../redux/api/form';
import FormChart from './FormChart'
import FormTimeline from './FormTimeline';
import StatCard from './StatCard';

type FormDashboardProps = {
  formID: string;
}


const FormDashboard: React.FC<FormDashboardProps> = ({formID}) => {
  const { data,refetch:statsRefetch } = useGetFormStatsQuery(formID);
  const { data:logs, refetch:logsRefetch } = useGetFormLogsQuery(formID);
  const { data:charts,refetch:chartsRefetch } = useGetFormChartsQuery(formID);

  
  const onRefetch = () => {
    statsRefetch();
    logsRefetch();
    chartsRefetch();
  }
  
  return (
    <div>
      <div style={{display:"flex",justifyContent:"right"}}>
        <ActionIcon onClick={onRefetch} size="md">
          <MdRefresh />
        </ActionIcon>
      </div>
      <Grid mt={30}>
        <Grid.Col xl={6} lg={8} md={8}>
          <FormChart data={charts} />
        </Grid.Col>

        <Grid.Col xl={3} lg={4} md={4}>
          <Group style={{ width: '100%', margin: '0rem auto' }}>
            <StatCard
              label="Datasets"
              stats={data?.data?.stats?.count}
              Icon={DiDatabase}
            />
            <StatCard
              label="Dataset Size"
              stats={`${((data?.data?.stats?.size || 0) / 1000000).toFixed(
                2
              )} MB`}
              Icon={DiDatabase}
            />
            <StatCard
              label="Total Reads"
              stats={data?.data?.stats?.reads}
              Icon={DiDatabase}
            />
            <StatCard
              label="Total Writes"
              stats={data?.data?.stats?.writes}
              Icon={DiDatabase}
            />
          </Group>
        </Grid.Col>
        <Grid.Col xl={3} lg={6}>
          <FormTimeline data={logs} />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default FormDashboard