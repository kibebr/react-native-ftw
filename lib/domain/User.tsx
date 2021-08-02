import { Document } from './Document'

export type User = {
  name: string
  documents: Document[]
}

export const emptyUser: User = {
  name: '',
  documents: []
}
