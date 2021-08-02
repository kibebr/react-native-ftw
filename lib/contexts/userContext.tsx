import React from 'react'
import { FunctionComponent, useState, createContext } from 'react'
import { User } from '../domain/User'
import { Option, some, isSome, none } from 'fp-ts/Option'

export type UserContextValue = [User]

export const UserContext = createContext<UserContextValue>([{
  name: '',
  documents: []
}])

export const UserContextProvider: FunctionComponent<{initialUser: User}> = ({ children, initialUser }) => {
  const [user] = useState<User>(initialUser)

  return (
    <UserContext.Provider value={[user]}>
      {children}
    </UserContext.Provider>
  )
}
