import React from 'react'
import { useUser } from 'hooks/useUser'
import { DefaultView, ViewTitle } from 'components/View'
import { Card } from 'react-native-elements'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { WithBiometrics } from 'screens/Biometrics'

export const SeeAllDocumentsScreen = (): JSX.Element => {
  const [user] = useUser()
  const { navigate } = useNavigation()

  return (
    <WithBiometrics 
      description='Authenticate to see your documents.' 
      handleError={() => navigate('Claims')}
    >
      <DefaultView>
        <ViewTitle>Your documents</ViewTitle>

        <Card>
          {user.documents.map((document) => (
            <View key={document.name}>
              <Text onPress={() => navigate('SeeDocument', { document })}>
                {document.name}
              </Text>

              <Card.Divider />
            </View>
          ))}
        </Card>
      </DefaultView>
    </WithBiometrics>
  )
}
