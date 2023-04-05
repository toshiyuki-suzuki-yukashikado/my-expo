import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {useEffect, useState} from 'react';
import {Camera, CameraType} from "expo-camera";

export default function App() {
  const [permission, setPermission] = useState<{
    isGranted: boolean
    isChecked: boolean
  }>({
    isGranted: false,
    isChecked: false
  })
  useEffect(() => {
    Camera.getCameraPermissionsAsync().then(({status}) => {
      setPermission({
        isGranted: status === 'granted',
        isChecked: true
      })
    })
  }, [])
  useEffect(() => {
    if (permission.isChecked && !permission.isGranted) {
      Camera.requestCameraPermissionsAsync().then(({status}) => {
        setPermission({
          isGranted: status === 'granted',
          isChecked: true
        })
      })
    }
  }, [permission])

  return (
    <View style={styles.container}>
     {permission.isGranted && (
        <Camera
          type={CameraType.back}
          ratio={'16:9'}
          style={styles.camera}
          onBarCodeScanned={(scannerResult)=>{
            console.log(scannerResult)
          }} />
       )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  }
});
