import { User } from '../../domain/User'
import { TaskEither, right, map as temap } from 'fp-ts/TaskEither'
import { Option, map as omap } from 'fp-ts/Option'
import { storage } from '../storage'
import { pipe } from 'fp-ts/function'

export const login = (_token: string): TaskEither<never, User> => right({
  name: 'user',
  documents: []
})

export const loginFromStorage: TaskEither<Error, Option<User>> = pipe(storage.get('loggedInUser'), temap(omap(JSON.parse)))
