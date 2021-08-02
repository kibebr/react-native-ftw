import { AsyncStorage } from 'react-native'
import { Option, fromNullable } from 'fp-ts/Option'
import { TaskEither, tryCatchK, map } from 'fp-ts/TaskEither'
import { toError } from 'fp-ts/Either'
import { flow } from 'fp-ts/function'

type Storage = {
  save: (key: string, item: string) => TaskEither<Error, void>
  get: (key: string) => TaskEither<Error, Option<string>>
}

// we map(fromNullable) here because although AsyncStorage.getItem returns a Promise<string>, the string can somehow be null???
// see https://reactnative.dev/docs/asyncstorage
// this makes no NullExceptionErrors are thrown in the runtime

export const storage: Storage = {
  save: tryCatchK(AsyncStorage.setItem, toError),
  get: flow(tryCatchK(AsyncStorage.getItem, toError), map(fromNullable))
}
