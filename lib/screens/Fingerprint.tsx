import React, { useState, useEffect, FunctionComponent } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { BiometricsAuthenticator, BiometricsAuthenticatorError, androidAuthenticator } from '../modules/biometrics'
import { fold } from 'fp-ts/Either'

type WithFingerprintProps = {
  description: string
  handleError: (error: BiometricsAuthenticatorError) => void
}

const makeWithFingerprint = (authenticator: BiometricsAuthenticator): FunctionComponent<WithFingerprintProps> => (props) => {
  const navigation = useNavigation()
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const { children, description, handleError } = props

  const authenticate = () => authenticator.authenticate({ description })().then(fold(
    handleError,
    () => { console.log('went through'); setAuthenticated(true) }
  ))

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('blur!')
      setAuthenticated(false)
    })

    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('focus')
      authenticate()
     })
    
    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [])

  useEffect(() => {
    console.log(authenticated)
  }, [authenticated])

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <View>
    </View>
  )
}

export const WithFingerprint = makeWithFingerprint(androidAuthenticator)
