import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ChakraProvider>
            <MantineProvider
              theme={{
                primaryColor: 'teal',
                breakpoints: {
                  xs: 500,
                  sm: 950,
                  md: 1300,
                  lg: 1400,
                  xl: 1800,
                },
              }}
              >
              <ModalsProvider>
              <App />
              </ModalsProvider>
            </MantineProvider>
          </ChakraProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);