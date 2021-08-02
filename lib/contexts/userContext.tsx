import React, { useReducer, Reducer, Dispatch } from 'react'
import { Document } from 'domain/Document'
import { ADT, match } from 'ts-adt'
import { FunctionComponent, createContext } from 'react'
import { User, emptyUser } from '../domain/User'
import { pipe, constVoid } from 'fp-ts/function'

type UserReducerAction = ADT<{
  AddDocument: { document: Document }
  RemoveDocument: { document: Document }
}>

export const userReducer: Reducer<User, UserReducerAction> = (user, action) => pipe(
  action,
  match({
    AddDocument: ({ document }) => ({ ...user, documents: user.documents.concat(document) }),
    RemoveDocument: ({ document }) => ({ ...user, documents: user.documents.filter((_document) => document !== _document) })
  })
)

export type UserContextValue = [User, Dispatch<UserReducerAction>]

export const UserContext = createContext<UserContextValue>([emptyUser, constVoid])

export const UserContextProvider: FunctionComponent<{initialUser: User}> = ({ children, initialUser }) => {
  const [user, dispatch] = useReducer(userReducer, initialUser)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
