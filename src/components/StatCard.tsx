// @ts-nocheck

import { Card, Text, ThemeIcon } from '@mantine/core';
import { isEmpty, isNaN, isUndefined } from 'lodash';
import React from 'react';

type StatsCardProps = {
  label: string;
  stats: string;
  Icon: React.FC;
};

const StatCard: React.FC<StatsCardProps> = ({ label, stats, Icon }) => {
  console.log('🚀 ~ file: StatCard.tsx ~ line 12 ~ stats', stats);
  return (
    <Card
      style={{ width: '100%', margin: 'auto' }}
      shadow="xl"
      padding="xl"
      radius="lg"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <Text
            align="left"
            style={{ fontSize: '24px', fontFamily: 'Fredoka' }}
          >
            {label}
          </Text>
          <Text align="left" style={{ fontSize: '34px', lineHeight: '2.4rem' }}>
            {!isUndefined(stats) ? stats : '0'}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <ThemeIcon
            variant="light"
            style={{ width: 80, height: 80, borderRadius: '50%' }}
          >
            <Icon width={40} height={40} style={{ fontSize: '3rem' }} />
          </ThemeIcon>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
