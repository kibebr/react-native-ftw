import React from 'react'
import { Document } from 'domain/Document'
import { DefaultView, ViewTitle } from 'components/View'
import { Card } from 'react-native-elements'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

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
  )
}
