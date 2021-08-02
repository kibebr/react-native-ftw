import { useContext } from 'react'
import { DeviceConfigValue, DeviceConfigContext } from '../contexts/deviceConfig'

export const useDeviceConfig = (): DeviceConfigValue => useContext(DeviceConfigContext)
