import React from 'react'
import { useUser } from '../hooks/useUser'
import { DefaultView, ViewTitle } from '../components/View'

export const ClaimsScreen = (): JSX.Element => {
  const [user] = useUser()

  return (
    <DefaultView>
      <ViewTitle>Claims</ViewTitle>
    </DefaultView>
  )
}
