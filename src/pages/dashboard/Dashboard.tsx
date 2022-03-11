import React from 'react'
import { Grid} from '@mantine/core'
import Stats from '../../components/Stats';
import Chart from '../../components/Chart';
import RecentActivity from '../../components/RecentActivity';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header title={`Dashboard`} />
      <Stats />
      <Grid mt={38}>
        <Grid.Col lg={12} xl={4}>
          <Chart />
        </Grid.Col>
        <Grid.Col lg={12} xl={8}>
          <RecentActivity />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Dashboard;  