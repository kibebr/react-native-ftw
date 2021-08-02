import React from 'react'
import { Button } from 'react-native-elements'
import { DefaultView, ViewTitle } from 'components/View'
import { useRef } from 'react'
import { RNCamera } from 'react-native-camera'
import tailwind from 'tailwind-rn'

export const TakeDocumentPictureScreen = () => {
  const cameraRef = useRef<null | RNCamera>(null)

  return (
    <DefaultView>
      <ViewTitle>Upload documents</ViewTitle>
      <RNCamera
        ref={cameraRef}
        style={tailwind('flex-1')}
        captureAudio={false}
      />
      <Button
        title='Take picture'
        onPress={async () => {
          if (cameraRef.current !== null) {
            const data = await cameraRef.current.takePictureAsync()
            console.log(data)
          }
        }}
      />
    </DefaultView>
  )
}
