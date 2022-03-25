import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { MantineProvider } from '@mantine/core'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalsProvider } from '@mantine/modals';

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);