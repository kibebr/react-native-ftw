import React from 'react'
import { ClaimsScreen } from '../screens/Claims'
import { createStackNavigator } from '@react-navigation/stack'
import tailwind from 'tailwind-rn'

type ClaimsStackParamList = {
  Claims: undefined
}

const ClaimsStack = createStackNavigator<ClaimsStackParamList>()

export const ClaimsNavigator = (): JSX.Element => {
  return (
    <ClaimsStack.Navigator screenOptions={{ headerShown: false }}>
      <ClaimsStack.Screen 
        name='Claims' 
        component={ClaimsScreen}
        options={{
          headerTintColor: 'red',
          headerStyle: tailwind('text-white bg-black')
        }}
      />
    </ClaimsStack.Navigator>
  )
}
