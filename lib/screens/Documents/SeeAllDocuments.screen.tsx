import React, { useEffect } from 'react'
import { Document } from 'domain/Document'
import { DefaultView, ViewTitle } from 'components/View'
import { Card } from 'react-native-elements'
import { Text, View } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import ReactNativeBiometrics from 'react-native-biometrics'
import { WithBiometrics } from 'screens/Biometrics'

const documents: Document[] = [{
  name: 'Driver License',
  source: 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
  published: new Date()
}, {
  name: 'BRP',
  source: 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
  published: new Date()
}]

export const SeeAllDocumentsScreen = (): JSX.Element => {
  const { navigate } = useNavigation()

  return (
    <WithBiometrics description='test' handleError={console.error}>
      <DefaultView>
        <ViewTitle>Your documents</ViewTitle>

        <Card>
          {documents.map((document) => (
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
