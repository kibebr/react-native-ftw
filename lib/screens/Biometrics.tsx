import React, { FunctionComponent, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useBiometrics } from 'hooks/useBiometrics'
import { View } from 'react-native'
import { BiometricsAuthenticatorError } from 'modules/biometrics'

type WithBiometricsProps = {
  description: string
  handleError: (error: BiometricsAuthenticatorError) => void
}

export const WithBiometrics: FunctionComponent<WithBiometricsProps> = (props) => {
  const { children, description, handleError } = props
  const [authenticated, { authenticate, unauthenticate }] = useBiometrics({ handleError })
  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      authenticate({ description })
    }

    if (!focused) {
      unauthenticate()
    }
  }, [focused])

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <View>
    </View>
  )
}
