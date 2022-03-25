import React from 'react';
import { Text, Timeline } from '@mantine/core';
import { useGetFormLogsQuery } from '../redux/api/form';
import { isEmpty } from 'lodash';
import moment from 'moment';

type FormChartProps = {
  data: Object;
}

const FormTimeline:React.FC<FormChartProps>=({data})=>{
  enum OpType {
    READ,
    NEW,
    UPDATE,
    DELETE,
  }
  return (
    <div>
      <Timeline mt={45} ml={35} active={2}>
        {!isEmpty(data) ? (
          data?.map(({ ip, location, opType,_id }) => (
            <Timeline.Item
              title={(() => {
                switch (opType) {
                  case '0':
                    return 'READ DOCUMENTS';
                  case '1':
                    return 'NEW DOCUMENT ADDED';
                  case '2':
                    return 'DOCUMENT DELETED';
                  case '3':
                    return 'DOCUMENT UPDATED';
                }
              })()}
            >
              <pre>
                <Text color="dimmed">
                  {ip || 'IP not Specified'}
                  {'    '}
                  {location.country || 'Country not Specified'}
                </Text>
                <Text color="dimmed">
                  {moment(new Date(parseInt(_id.substring(0, 8), 16) * 1000)).format("YYYY-MM-DD HH:mm")}
                </Text>
              </pre>
              <Text></Text>
            </Timeline.Item>
          ))
        ) : (
          <Timeline.Item title="Project Initialization">
            <pre></pre>
            <Text></Text>
          </Timeline.Item>
        )}
      </Timeline>
    </div>
  );
}

export default FormTimeline;
