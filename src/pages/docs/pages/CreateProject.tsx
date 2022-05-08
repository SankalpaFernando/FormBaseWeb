import React from 'react';
import { Text } from '@mantine/core';
import NewProjectButton from '../../../resources/NewProject.png';
import ModalNewProject from '../../../resources/ModalNewProject.png';

const CreateProject: React.FC = () => {
  return (
    <>
      <Text style={{ fontSize: '1rem' }} color="teal" align="left">
        Form Setup
      </Text>
      <Text style={{ fontSize: '2rem' }} my={10} align="left">
        Creating a Project
      </Text>
      <Text align="left" color="gray" mt={10}>
        From the Dashboard, select Project Page and click the <b>New Project</b>{' '}
        button in the left corner
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={180} height={0} src={NewProjectButton} />
      </div>
      <Text align="left" color="gray" mt={10}>
        It will prompt a modal as follow,
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '1rem',
        }}
      >
        <img width={500} height={0} src={ModalNewProject} />
      </div>
      <Text align="left" color="gray" mt={20}>
        It's compulsory to have a <b>Project Name</b> and a{' '}
        <b>Project Description</b>, After completing the Project Details, click
        on <b>Add Project</b> Button which will generate a <b>New Project</b>.
      </Text>
    </>
  );
};

export default CreateProject;
