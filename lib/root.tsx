import React from 'react'
import App from './App'
import { DeviceConfigProvider } from './contexts/deviceConfig'

export default (): JSX.Element => (
  <DeviceConfigProvider>
    <App />
  </DeviceConfigProvider>
) 
