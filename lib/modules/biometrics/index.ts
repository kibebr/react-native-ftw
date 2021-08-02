import FingerprintScanner, { FingerprintScannerError } from 'react-native-fingerprint-scanner'
import { TaskEither, tryCatch } from 'fp-ts/TaskEither'

export type BiometricsAuthenticatorError 
  = 'HardwareError'
  | 'UserCancel'

export type BiometricsAuthenticatorConfig = {
  description: string
}

export type BiometricsAuthenticator = {
  authenticate: (config: BiometricsAuthenticatorConfig) => TaskEither<BiometricsAuthenticatorError, void>
}

export const matchError = ({ name }: FingerprintScannerError): BiometricsAuthenticatorError => name as BiometricsAuthenticatorError

export const androidAuthenticator: BiometricsAuthenticator = {
  authenticate: (config) => tryCatch(
    () => FingerprintScanner.authenticate({ description: config.description }),
    matchError
  )
}

export const iosAuthenticator: BiometricsAuthenticator = {
  authenticate: (config) => tryCatch(
    () => FingerprintScanner.authenticate({ description: config.description }),
    matchError
  )
}
