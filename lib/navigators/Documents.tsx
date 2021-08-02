import React from 'react'
import { Document } from '../domain/Document'
import { DocumentsScreen, UploadDocumentsScreen, SeeDocumentScreen } from '../screens/Documents'
import { createStackNavigator } from '@react-navigation/stack'
import { Button } from 'react-native-elements'
import { withNavigation } from '@react-navigation'
import { WithFingerprint } from '../screens/Fingerprint'
import tailwind from 'tailwind-rn'
export type DocumentsStackParamList = {
  SeeDocument: { document: Document }
  UploadDocuments: undefined
  Documents: undefined
}
const DocumentsStack = createStackNavigator<DocumentsStackParamList>()

export const DocumentsNavigator = (): JSX.Element => {
  return (
    <DocumentsStack.Navigator>
      <DocumentsStack.Screen 
        name='Documents' 
        component={() => (
          <WithFingerprint handleError={console.error} description='Authenticate to see your documents.'>
            <DocumentsScreen />
          </WithFingerprint>
        )}
        options={({ navigation }) => ({
          headerTintColor: 'white',
          headerStyle: tailwind('text-white bg-black'),
          headerRight: () => (
            <Button
              title='Upload'
              type='clear'
              onPress={() => navigation.navigate('UploadDocuments')}
            />
          )
        })}
      />
      <DocumentsStack.Screen
        name='UploadDocuments'
        component={UploadDocumentsScreen}
        options={() => ({
          title: 'Upload documents'
        })}
      />
      <DocumentsStack.Screen
        name='SeeDocument'
        component={SeeDocumentScreen}
        options={() => ({
          title: 'Viewing document'
        })}
      />
    </DocumentsStack.Navigator>
  )
}
