import { Either, left, right } from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import { Image } from 'modules/camera'
import { launchImageLibrary, Asset, ImagePickerResponse } from 'react-native-image-picker'

export type Response = {
  images: Image[]
}

export type ResponseError
  = 'NoPermission'
  | 'UserCancelled'
  | 'FatalError'

export type CameraRoll = {
  launch: (callback: ((response: Either<ResponseError, Response>) => unknown)) => unknown
}

const imagePickerResponseToDomainResponse = (response: ImagePickerResponse): Either<ResponseError, Response> => {
  if (response.didCancel) {
    return left('UserCancelled')
  }

  if (response.errorCode && response.errorMessage) {
    if (response.errorCode === 'permission') {
      return left('NoPermission')
    }

    return left('FatalError')
  }

  return right({
    images: response.assets as Required<Asset>[]
  })
}

export const cameraRoll: CameraRoll = {
  launch: (callback) => launchImageLibrary(
    { mediaType: 'photo' },
    flow(imagePickerResponseToDomainResponse, callback)
  )
}
