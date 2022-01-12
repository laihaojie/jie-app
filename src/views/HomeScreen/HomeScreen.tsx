import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Text, ScrollView, Alert, StyleSheet, } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { selectNativeData, selectToken, selectVersion } from "src/store/selectors"
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenHeight, screenWidth } from "src/utils/constants"
import actions from "src/store/actions"
import * as UpdateAPK from "jie-rn-update-apk"
import ProgressModal from "src/components/ShowModal/ProgressModal"
import { store } from "src/store"
import { useFocusEffect } from "@react-navigation/native"



const HomeScreen: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const token = useSelector(selectToken)
  const [progress, setProgress] = useState(0)
  const version = useSelector(selectVersion)
  const dispatch = useDispatch()
  const updater = useRef<any>(null)


  updater.current = new UpdateAPK.UpdateAPK({

    apkVersionUrl: `https://api.huihuizi.top/api/public/androidVersion`,
    devVersion: version,
    apkVersionOptions: {
      method: 'GET',
      headers: {}
    },

    apkOptions: {
      headers: {}
    },
    fileProviderAuthority: "com.jieapp.fileprovider",

    needUpdateApp: performUpdate => {
      console.log("开发更新版本号=================", version);
      Alert.alert(
        "有新版本",
        "新版本发布",
        [
          { text: "取消", onPress: () => { } },
          {
            text: "更新", onPress: () => {
              performUpdate(true);
            }
          }
        ])
    },


    forceUpdateApp: () => {
      console.log("forceUpdateApp callback called");
    },

    notNeedUpdateApp: ({ devVersion }) => {
      dispatch(actions.setVersion(devVersion))
    },
    downloadApkStart: () => {
      setProgressModalVisible(true)
      // console.log("开发更新版本号=================", version);
    },

    downloadApkProgress: progress => {
      setProgress(progress)
    },

    // This is called prior to the update. If you throw it will abort the update
    downloadApkEnd: ({ devVersion }) => {
      setProgressModalVisible(false)
      dispatch(actions.setVersion(devVersion))
    },

    onError: err => {
      console.log("onError callback called", err);
      Alert.alert("There was an error", err.message);
    }
  });



  const [progressModalVisible, setProgressModalVisible] = useState(false)
  useFocusEffect(
    useCallback(() => {
      console.log("kanjianl");
    }, [])
  )
  useEffect(() => {


    updater.current.checkUpdate()
  }, [])

  React.useEffect(() => {
    console.log(version);

  }, [version])

  // console.log(dayjs.utc().isUTC());
  const nativeData = useSelector(selectNativeData)
  console.log(store.getState());


  return (

    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>

        {
          progressModalVisible && <ProgressModal onClose={setProgressModalVisible} progress={progress}></ProgressModal>
        }

        <Text>首页</Text>

        <Text>{JSON.stringify(nativeData)}</Text>

      </ScrollView>
    </SafeAreaView>


  );
}

export default React.memo(HomeScreen)

const styles = StyleSheet.create({

  modalView: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
  },

});
