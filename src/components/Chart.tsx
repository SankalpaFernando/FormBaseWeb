import React from 'react';
import { Card,Text, useMantineTheme } from '@mantine/core';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const Chart: React.FC = () => {
  const theme = useMantineTheme();
  const color = theme.colors[theme.primaryColor.toString()][4];
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <Card shadow="xl" padding="xl" radius="lg">
      <Text
        size="xl"
        align="left"
        style={{ fontSize: '1.6rem', fontFamily: 'Fredoka' }}
        mb={20}
      >
        Total Submits - Past 7 days
      </Text>
      <Line
        height={200}
        width={250}
        data={{
          labels: [
            '01-01',
            '01-02',
            '01-03',
            '01-04',
            '01-05',
            '01-06',
            '01-07',
            '01-08',
          ],
          datasets: [
            {
              label: 'Total Submits',
              backgroundColor: '#40c057',
              borderColor: `${color}`,
              data: [0, 10, 5, 6, 6, 8, 7, 20],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } },
          },
        }}
      />
    </Card>
  );
};

export default Chart;
