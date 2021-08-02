import ReactNativeBiometrics from 'react-native-biometrics'
import { TaskEither, left, right, chain, tryCatch } from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

export type LibraryAuthenticatorResponse = {
  success: boolean
  error: string
}

export type BiometricsAuthenticatorError 
  = 'UserCancel'
  | 'FatalError'

export type BiometricsAuthenticatorConfig = {
  description: string
}

export type BiometricsAuthenticator = {
  authenticate: (config: BiometricsAuthenticatorConfig) => TaskEither<BiometricsAuthenticatorError, {}>
}

export const authenticator: BiometricsAuthenticator = {
  authenticate: (config) => pipe(
    tryCatch(
      () => ReactNativeBiometrics.simplePrompt({ promptMessage: config.description }),
      (): BiometricsAuthenticatorError => 'FatalError'
    ),
    chain(({ success }) => {
      if (success) {
        return right({})
      }

      return left('UserCancel')
    })
  )
}
