import { Box,Text } from '@mantine/core';
import React, { useState } from 'react'
import "../styles/components.scss"

type PluginCardProps = {
  icon: string;
  name: String;
  description: String;
}

const PluginCard: React.FC<PluginCardProps> = ({ icon, name,description }) => {
  const [active, setActive] = useState(false);
  return (
      <Box
      className="plugin-card"
      onClick={()=>setActive(!active)}
        sx={(theme) => ({
          border: `${
            active ? `3px solid ${theme.colors[theme.primaryColor][5]}` : '2px solid #868e96'
          }`,
          '&:hover': {
            borderColor: theme.colors[theme.primaryColor][5],
          },
        })}
      >
        <div className="plugin-img">
          <img width={45} height={45} src={icon} />
        </div>
        <div>
          <Text size="lg" align="center" my={8}>
          {name}
          </Text>
          <Text size="sm" color="#868e96" align="center">
          {description}
        </Text>
        </div>
      </Box>
  );
}

export default PluginCard