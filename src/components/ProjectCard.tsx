import { Card, Text } from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCurrentProject } from "../redux/reducer/routes";

type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
}


const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, description }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card
      onClick={() => {
        console.log("🚀 ~ file: ProjectCard.tsx ~ line 20 ~ id", id)
        dispatch(setCurrentProject({id,name}))
        navigate(`${id}`)
      }}
      style={{
        margin: '1rem auto',
        padding: '2rem',
        border: '1px solid #eeee',
        height: "260px",
        maxHeight: "260px",
        minHeight:"260px",
        width:"300px"
      }}
      shadow="md"
      sx={(theme) => ({
        '&:hover': {
          boxShadow: `0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 36px 28px -7px, rgb(0 0 0 / 4%) 0px 17px 17px -7px`,
          cursor:"pointer"
        },
      })}
    >
      <Text size="xl" align="left" color="teal">
        {name}
      </Text>
      <Text size="sm" align="left" style={{maxHeight:"150px",height:"150px",textOverflow:"ellipsis",overflow:"clip"}} mt={15} color="#868e96">
        {description}
      </Text>
    </Card>
  );
};

export default ProjectCard;
