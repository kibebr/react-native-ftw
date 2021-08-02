import React, { useState, useEffect, createContext, FunctionComponent } from 'react'
import { Option, none, some } from 'fp-ts/Option'
import FingerprintScanner from 'react-native-fingerprint-scanner'

export type DeviceConfigValue = {
  biometrics: Option<'Touch ID' | 'Face ID' | 'Biometrics'>
}

const defaultDeviceConfigValue: DeviceConfigValue = {
  biometrics: none
}

export const DeviceConfigContext = createContext<DeviceConfigValue>(defaultDeviceConfigValue)

export const DeviceConfigProvider: FunctionComponent = ({ children }) => {
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfigValue>(defaultDeviceConfigValue)

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((biometrics) => setDeviceConfig({ biometrics: some(biometrics) }))
  }, [])

  return (
    <DeviceConfigContext.Provider value={deviceConfig}>
      {children}
    </DeviceConfigContext.Provider>
  )
}
