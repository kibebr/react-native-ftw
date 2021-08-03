import React, { useState, useEffect, createContext, FunctionComponent } from 'react'
import { Option, none, some } from 'fp-ts/Option'

export type DeviceConfigValue = {}

const defaultDeviceConfigValue: DeviceConfigValue = {
  biometrics: none
}

export const DeviceConfigContext = createContext<DeviceConfigValue>(defaultDeviceConfigValue)

export const DeviceConfigProvider: FunctionComponent = ({ children }) => {
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfigValue>(defaultDeviceConfigValue)

  useEffect(() => {
  }, [])

  return (
    <DeviceConfigContext.Provider value={deviceConfig}>
      {children}
    </DeviceConfigContext.Provider>
  )
}
