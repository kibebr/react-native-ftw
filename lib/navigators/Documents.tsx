import React from 'react'
import { Document } from '../domain/Document'
import { SeeDocumentScreen } from 'screens/Documents/SeeDocument.screen'
import { CreateDocumentScreen } from 'screens/Documents/CreateDocument.screen'
import { SeeAllDocumentsScreen } from 'screens/Documents/SeeAllDocuments.screen'
import { createStackNavigator } from '@react-navigation/stack'
import { Button } from 'react-native-elements'
import tailwind from 'tailwind-rn'

export type DocumentsStackParamList = {
  SeeDocument: { 
    document: Document
  }
  CreateDocument: undefined
  Documents: undefined
}

const DocumentsStack = createStackNavigator<DocumentsStackParamList>()
export const DocumentsNavigator = (): JSX.Element => {
  return (
    <DocumentsStack.Navigator>
      <DocumentsStack.Screen 
        name='Documents' 
        component={SeeAllDocumentsScreen}
        options={({ navigation }) => ({
          headerTintColor: 'black',
          headerStyle: tailwind('text-white bg-white'),
          headerRight: () => (
            <Button
              title='Create'
              type='clear'
              onPress={() => navigation.navigate('CreateDocument')}
            />
          )
        })}
      />
      <DocumentsStack.Screen
        name='CreateDocument'
        component={CreateDocumentScreen}
        options={() => ({
          title: 'Create a document'
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
