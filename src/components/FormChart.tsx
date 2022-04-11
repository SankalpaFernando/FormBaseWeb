// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Card, Text, ActionIcon, useMantineTheme } from '@mantine/core';
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
import { useGetFormChartsQuery } from '../redux/api/form';
import { isEmpty } from 'lodash';
import { MdRefresh } from 'react-icons/md';

type FormChartsProps = {
  data: Object;
};

const FormChart: React.FC<FormChartsProps> = ({ data }) => {
  const theme = useMantineTheme();
  const colorOne = theme.colors[theme.primaryColor.toString()][4];
  const colorTwo = theme.colors[theme.primaryColor.toString()][8];
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [chartData, setChartData] = useState({
    dates: [],
    reads: [],
    writes: [],
  });
  useEffect(() => {
    const dates: string[] = [];
    const reads: string[] = [];
    const writes: string[] = [];
    if (!isEmpty(data)) {
      data?.data?.stats?.readCounts.forEach((entry: { _id: string }) =>
        dates.push(entry._id)
      );
      data?.data?.stats?.writeCounts.forEach(
        (entry: { _id: string }) =>
          !dates.includes(entry._id) && dates.push(entry._id)
      );

      dates.forEach((date) => {
        const readIndex = data?.data?.stats?.readCounts.find(
          (entry) => entry._id == date
        );
        const writeIndex = data?.data?.stats?.writeCounts.find(
          (entry) => entry._id == date
        );

        if (readIndex !== undefined) {
          reads.push(readIndex.total);
        } else {
          reads.push(0);
        }

        if (writeIndex !== undefined) {
          writes.push(writeIndex.total);
        } else {
          writes.push(0);
        }
      });

      setChartData({ dates, reads, writes });
    }
  }, [data]);
  return (
    <Card style={{ height: '100%' }} shadow="xl" padding="xl" radius="lg">
      <Line
        height={200}
        width={250}
        data={{
          labels: [...chartData.dates],
          datasets: [
            {
              label: 'Total Reads',
              backgroundColor: `${colorOne}`,
              borderColor: `${colorOne}`,
              data: [...chartData.reads],
            },
            {
              label: 'Total Writes',
              backgroundColor: `${colorTwo}`,
              borderColor: `${colorTwo}`,
              data: [...chartData.writes],
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

export default FormChart;
