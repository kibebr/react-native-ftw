import React from 'react'
import App from './App'
import { DeviceConfigProvider } from './contexts/deviceConfig'
import { PushNotificationContextProvider } from './contexts/pushNotification.context'
import { NavigationContainer } from '@react-navigation/native'

export default (): JSX.Element => (
  <DeviceConfigProvider>
    <PushNotificationContextProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PushNotificationContextProvider>
  </DeviceConfigProvider>
) 
