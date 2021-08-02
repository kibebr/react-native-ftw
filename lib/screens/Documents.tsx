import React, { useRef } from 'react'
import { Document } from '../domain/Document'
import { DefaultView, ViewTitle } from '../components/View'
import { Button, Card } from 'react-native-elements'
import { RNCamera } from 'react-native-camera'
import { Text, View } from 'react-native'
import { useNavigation, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DocumentsStackParamList } from '../navigators/Documents'
import { WithFingerprint } from '../screens/Fingerprint'
import Pdf from 'react-native-pdf'
import tailwind from 'tailwind-rn'

const documents: Document[] = [{
  name: 'Driver License',
  source: 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
  published: new Date()
}, {
  name: 'BRP',
  source: 'https://www.soundczech.cz/temp/lorem-ipsum.pdf',
  published: new Date()
}]

export const UploadDocumentsScreen = (): JSX.Element => {
  const cameraRef = useRef<null | RNCamera>(null)

  return (
    <DefaultView>
      <ViewTitle>Upload documents</ViewTitle>
      <RNCamera
        ref={cameraRef}
        style={tailwind('flex-1')}
        captureAudio={false}
      />
      <Button
        title='Take picture'
        onPress={async () => {
          if (cameraRef.current !== null) {
            const data = await cameraRef.current.takePictureAsync()
            console.log(data)
          }
        }}
      />
    </DefaultView>
  )
}

export const SeeDocumentScreen = ({ route }: { route: RouteProp<DocumentsStackParamList, 'SeeDocument'> }): JSX.Element => {
  return (
    <View>
      <Pdf 
        source={{ uri: route.params.document.source, cache: false }}
        style={tailwind('h-full')}
      />
    </View>
  )
}

export const DocumentsScreen = (): JSX.Element => {
  const { navigate } = useNavigation()

  return (
    <DefaultView>
      <ViewTitle>Your documents</ViewTitle>

      <Card>
        {documents.map((document) => (
          <View key={document.name}>
            <Text onPress={() => navigate('SeeDocument', { document })}>{document.name}</Text>
            <Card.Divider />
          </View>
        ))}
      </Card>
    </DefaultView>
  )
}

