import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { MantineProvider } from '@mantine/core'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <MantineProvider theme={{primaryColor:"teal"}}>
          <App />
        </MantineProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
