import React, { useEffect } from 'react'
import { UserContextProvider } from './contexts/userContext'
import { useAuth } from './hooks/useAuth'
import { fold } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ClaimsNavigator } from './navigators/Claims'
import { DocumentsNavigator } from './navigators/Documents'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from './screens/Welcome'

const Tab = createBottomTabNavigator()
const WelcomeStack = createStackNavigator()

const App = (): JSX.Element => {
  const [session, { login, loginFromStorage }] = useAuth()

  // we try to login with storage when the app runs
  useEffect(() => loginFromStorage(), [])

  // here we check if the session is None or Some<User>, if it is None, render the Welcome (Log-in) screen, otherwise just render the app
  // All the screens (Claims, Documents, Settings, etc.) will be using the logged-in user extensively, so we just wrap them in a Context
  // and the screens can access the logged-in user via the useUser hook
  return (
    <NavigationContainer>
      {pipe(
        session,
        fold(
          () => (
            <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
              <WelcomeStack.Screen
                name='Login'
                component={() => <Welcome handleLogin={login} />}
              />
            </WelcomeStack.Navigator>
          ),
          (user) => (
            <UserContextProvider initialUser={user}>
              <Tab.Navigator>
                <Tab.Screen 
                  name='Claims' 
                  component={ClaimsNavigator}
                />
                <Tab.Screen 
                  name='Documents' 
                  component={DocumentsNavigator}
                />
             </Tab.Navigator>
            </UserContextProvider>
          )
        )
      )}
    </NavigationContainer>
  )
}

export default App
