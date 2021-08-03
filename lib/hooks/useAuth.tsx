import { useState, useEffect } from 'react'
import { login, loginFromStorage } from '../modules/auth'
import { User } from '../domain/User'
import { fold } from 'fp-ts/Either'
import { Option, some, none } from 'fp-ts/Option'

type UseAuth = [Option<User>, {
  login: (_: string) => void,
  loginFromStorage: () => void
}]

export const useAuth = (): UseAuth => {
  const [session, setSession] = useState<Option<User>>(none)

  const handleLogin = (token: string) => {
    login(token)()
    .then(fold(
      () => console.warn('User not found!'),
      (user) => setSession(some(user))
    ))
  }

  const handleLoginFromStorage = () => {
    loginFromStorage()
    .then(fold(
      (error) => console.error('There was a problem when trying to access the storage: ', error),
      setSession
    ))
  }

  return [session, {
    login: handleLogin,
    loginFromStorage: handleLoginFromStorage
  }]
}
