import type { Notification } from 'contexts/pushNotification.context'
import PushNotification, { ReceivedNotification } from 'react-native-push-notification'
import { flow } from 'fp-ts/function'

export type PushNotificationConfig = {
  handleOpenNotification: (notification: Notification) => unknown
}

export type NewNotificationConfig = {
  title: string
  subtext: string
  message: string
}

export const libraryNotifToDomainNotif = (notif: Omit<ReceivedNotification, 'userInfo'>): Notification => ({
  id: String(notif.id),
  date: new Date(),
  message: JSON.stringify(notif.data)
})

export const configure = (config: PushNotificationConfig) => PushNotification.configure({
  onNotification: flow(libraryNotifToDomainNotif, config.handleOpenNotification),
  popInitialNotification: true,
  requestPermissions: true,
})

export const pushNotification = (config: NewNotificationConfig) => PushNotification.localNotification({
  title: config.title,
  subText: config.subtext,
  message: config.message
}) 
