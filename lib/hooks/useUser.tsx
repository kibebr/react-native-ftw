import { useContext } from 'react'
import { UserContext, UserContextValue } from '../contexts/userContext'

export const useUser = (): UserContextValue => useContext(UserContext)
