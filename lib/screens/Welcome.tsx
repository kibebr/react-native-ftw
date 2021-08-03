import React, { useState } from 'react'
import tailwind from 'tailwind-rn'
import { DefaultView } from '../components/View'
import { Button } from 'react-native-elements'
import { Text, TextInput, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { WelcomeStackRoute } from 'App'

export const Welcome = (): JSX.Element => {
  const { params: { handleLogin } } = useRoute<RouteProp<WelcomeStackRoute, 'Login'>>()
  const [token, setToken] = useState<string>('')

  return (
    <DefaultView>
      <View style={tailwind('flex flex-col')}>
        <View style={tailwind('p-4')}>
          <Text style={tailwind('font-bold text-3xl my-24')}>Log-in to the portal.</Text>
        </View>

        <TextInput 
          placeholder='Token'
          style={tailwind('bg-gray-100 text-lg rounded-md p-2')}
          onChangeText={setToken}
        />

        <Button 
          title='Log-in'
          containerStyle={tailwind('my-4')}
          buttonStyle={tailwind('p-4')}
          onPress={() => handleLogin(token)}
        />
      </View>
    </DefaultView>
  )
}
