import { useState } from 'react'
import { fold } from 'fp-ts/Either'
import { authenticator, BiometricsAuthenticatorConfig, BiometricsAuthenticatorError } from 'modules/biometrics'

type UseBiometrics = [boolean, {
  authenticate: (config: BiometricsAuthenticatorConfig) => void,
}]

type UseBiometricsProps = {
  handleError: (error: BiometricsAuthenticatorError) => void
}

export const useBiometrics = ({ handleError }: UseBiometricsProps): UseBiometrics => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  return [authenticated, {
    authenticate: ({ description }) => authenticator.authenticate({ description })().then(fold(
      handleError,
      () => setAuthenticated(true)
    ))
  }]
}
