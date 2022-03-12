import { Box,Button,Grid,Text } from '@mantine/core';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import OauthPopup from "react-oauth-popup";
import "../styles/components.scss"

type PluginCardProps = {
  icon: string;
  name: String;
  description: String;
}


const PluginCard: React.FC<PluginCardProps> = ({ icon, name,description }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const onCode = (code) => {
    console.log("🚀 ~ file: PluginCard.tsx ~ line 18 ~ onCode ~ code", code)
  }
  
  const onAuthCode = (code) => {
    return
  }

  return (
    <Box
      className="plugin-card"
      sx={(theme) => ({
        border: `${
          active
            ? `3px solid ${theme.colors[theme.primaryColor][5]}`
            : '2px solid #868e96'
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem auto',
        }}
      >
        <OauthPopup
          url="https://slack.com/oauth/v2/authorize?scope=incoming-webhook,commands&client_id=1426926653554.3223730928486"
          onCode={onAuthCode}
          onClose={()=>console.log("Consol")}
        >
          <Button>Authorize</Button>
        </OauthPopup>
      </div>
    </Box>
  );
}

export default PluginCard