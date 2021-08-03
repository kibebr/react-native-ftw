import React, { FunctionComponent, useState, useEffect, createContext } from 'react'
import { storage } from 'modules/storage'
import { pipe } from 'fp-ts/function'
import { configure } from 'modules/push-notifications'
import { fold } from 'fp-ts/Either'
import { constVoid } from 'fp-ts/lib/function'
import { Option, some, none } from 'fp-ts/Option'

export type Notification = {
  id: string,
  date: Date
  message: string
}

export type PushNotificationContextValue = [Notification[], {
  pushNotification: () => void
}]

const PushNotificationContext = createContext<PushNotificationContextValue>([[], {
  pushNotification: constVoid
}])

export const PushNotificationContextProvider: FunctionComponent = ({ children }) => {
  const [token, setToken] = useState<Option<string>>(none)
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  const handleNoPermission = () => {

  }

  const onOpenNotification = (notification: Notification) => {
    console.log('received: ', notification)
  }

  useEffect(() => {
    configure({ handleOpenNotification: onOpenNotification })
  }, [])

  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    <PushNotificationContext.Provider value={[notifications, { pushNotification: constVoid }]}>
      {children}
    </PushNotificationContext.Provider>
  )
}
