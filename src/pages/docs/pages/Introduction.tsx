import React from 'react'
import { Text } from '@mantine/core';
import flow from '../../../resources/flow.svg';

const Introduction:React.FC=()=> {
  return (
    <>
      <Text style={{ fontSize: '2rem' }} color="teal" align="left">
        Introduction
      </Text>
      <Text align="left" mt={10}>
        Formbase is an API based Form Submission Platform that allows frontend
        developers to handle form submissions and submitted data without a
        hassle
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
        }}
      >
        <img width={700} height={0} src={flow} />
      </div>
    </>
  );
}

export default Introduction;