// @ts-nocheck
import React, { useEffect, useState } from 'react';
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
import { useGetTotalSubmitsQuery } from '../redux/api/info';
import { isEmpty } from 'lodash';
import moment from "moment";

const Chart: React.FC = () => {

  const {data:DailySubmits,isLoading,refetch } = useGetTotalSubmitsQuery({});

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
     const [chartData, setChartData] = useState({
       dates: [],
       writes: [],
     });
     useEffect(() => {
       const dates: string[] = [];
       const reads: string[] = [];
       const writes: string[] = [];
       if (!isEmpty(DailySubmits)) {

         let startDate = moment(new Date()).subtract(6, "day");
         for (let day = 0; day < 7; day++){
           const writeIndex = DailySubmits?.data?.writeCounts.find(
             (entry) => entry._id == startDate.format("YYYY-MM-DD")
             );
             
             if (writeIndex !== undefined) {
               writes.push(writeIndex.total);
              } else {
                writes.push(0);
             }
           dates.push(startDate.format("YYYY-MM-DD"))
              startDate = startDate.add(1,"day")
         }

       

         setChartData({ dates, writes });
       }
     }, [DailySubmits]);
  useEffect(() => {
    refetch()
  },[])
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
          labels: [...chartData.dates],
          datasets: [
            {
              label: 'Total Submits',
              backgroundColor: '#40c057',
              borderColor: `${color}`,
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

export default Chart;
