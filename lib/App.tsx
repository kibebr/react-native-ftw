import React, { useEffect } from 'react'
import { UserContextProvider } from './contexts/userContext'
import { useAuth } from './hooks/useAuth'
import { fold } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ClaimsNavigator } from './navigators/Claims'
import { DocumentsNavigator } from './navigators/Documents'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from './screens/Welcome'

export type WelcomeStackRoute = {
  Login: { handleLogin: (token: string) => unknown }
}

const Tab = createBottomTabNavigator()
const WelcomeStack = createStackNavigator<WelcomeStackRoute>()

const App = (): JSX.Element => {
  const [session, { login, loginFromStorage }] = useAuth()

  // we try to login with sorage when the app runs
  useEffect(() => loginFromStorage(), [])

  // here we check if the session is None or Some<User>, if it is None, render the Welcome (Log-in) screen, otherwise just render the app
  // All the screens (Claims, Documents, Settings, etc.) will be using the logged-in user extensively, so we just wrap them in a Context
  // and the screens can access the logged-in user via the useUser hook
  //
  console.log('updated!! session: ', session)

  return pipe(
    session,
    fold(
      () => (
        <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
          <WelcomeStack.Screen
            name='Login'
            component={Welcome}
            initialParams={{ handleLogin: login }}
          />
        </WelcomeStack.Navigator>
      ),
      (user) => (
        <UserContextProvider initialUser={user}>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
              name='ClaimsNavigator' 
              component={ClaimsNavigator}
              options={{
                title: 'Claims'
              }}
            />
            <Tab.Screen 
              name='DocumentsNavigator' 
              component={DocumentsNavigator}
              options={{
                title: 'Documents'
              }}
            />
          </Tab.Navigator>
        </UserContextProvider>
      )
    )
  )
}

export default App
