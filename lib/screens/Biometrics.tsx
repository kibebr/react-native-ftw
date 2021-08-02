import React, { FunctionComponent } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useBiometrics } from 'hooks/useBiometrics'
import { View } from 'react-native'
import { BiometricsAuthenticatorError } from 'modules/biometrics'

type WithFingerprintProps = {
  description: string
  handleError: (error: BiometricsAuthenticatorError) => void
}

export const WithBiometrics: FunctionComponent<WithFingerprintProps> = (props) => {
  const { children, description, handleError } = props
  const [authenticated, { authenticate }] = useBiometrics({ handleError })

  useFocusEffect(() => {
    authenticate({ description })
  })

  if (authenticated) {
    return <>{children}</>
  }

  return (
    <View>
    </View>
  )
}
