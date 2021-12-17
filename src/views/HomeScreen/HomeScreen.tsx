import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Button, Text, View, TextInput, ScrollView, StatusBar, Modal, Alert, StyleSheet, TouchableOpacity, NativeModules } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Api } from "src/api"
import { selectToken, selectVersion } from "src/store/selectors"

import { SafeAreaView } from 'react-native-safe-area-context';
import LoginCard from "./LoginCard"
import AlreadyLoggedCard from "./AlreadyLoggedCard"
import TaskCard from "../../components/Screen/Task"
import ApplyCard from "./ApplyCard"
import NewsCard from "./NewsCard"
import Advertising from "./Advertising"
import { screenHeight, screenWidth } from "src/utils/constants"
import Exclusive from "./Exclusive"
import actions from "src/store/actions"
import * as UpdateAPK from "rn-update-apk"
import DeviceInfo from 'react-native-device-info';
import WithdrawCard from "./WithdrawCard"
import EarningsCard from "./EarningsCard"
import ShowModal from "src/components/ShowModal/ShowModal"
import FirstHongBao from "src/components/ShowModal/FirstHongBao"
import ProgressModal from "src/components/ShowModal/ProgressModal"
import SuperMarket from "../../components/Screen/SuperMarket"
import Task from "../../components/Screen/Task"
import Receive from "./Receive"


const HomeScreen: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const token = useSelector(selectToken)
  const [progress, setProgress] = useState(0)
  const [version, setVersion] = useState(useSelector(selectVersion))
  const dispatch = useDispatch()
  const updater = useRef<any>(null)

  updater.current = new UpdateAPK.UpdateAPK({

    apkVersionUrl: `https://api-inapp.lingman.tech/api/Public/dev/androidversion`,
    devVersion: version,
    apkVersionOptions: {
      method: 'GET',
      headers: {}
    },

    apkOptions: {
      headers: {}
    },
    fileProviderAuthority: "com.inapp.fileprovider",


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
      setVersion(devVersion)
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
      setVersion(devVersion)
    },

    onError: err => {
      console.log("onError callback called", err);
      Alert.alert("There was an error", err.message);
    }
  });


  const [modalVisible, setModalVisible] = useState(true);
  const [progressModalVisible, setProgressModalVisible] = useState(false)
  useEffect(() => {
    if (!modalVisible) {
      // 检查版本是否更新
      updater.current.checkUpdate()
    }
    // setInterval(() => {


    //   setProgress((val) => {
    //   console.log(val);

    //    return val + 1
    //   })
    // }, 20)
  }, [modalVisible])



  return (

    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['left', 'right']}>
      <ScrollView>
        {/* <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          {modalVisible ? <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.3)" /> : null}
          <TouchableOpacity style={styles.modalView} onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Hello World!</Text>
          </TouchableOpacity>
        </Modal> */}
        {
          modalVisible && <FirstHongBao onClose={setModalVisible}></FirstHongBao>
        }

        {
          progressModalVisible && <ProgressModal onClose={setProgressModalVisible} progress={progress}></ProgressModal>
        }


        {
          token ?
            <AlreadyLoggedCard />
            : <LoginCard />
        }

        <Advertising />

        <Receive />

        <WithdrawCard />


        {/* <Task item={{}}  />
        <Task item={{}} /> */}

        <SuperMarket />
        <SuperMarket />

        <ApplyCard />
        <Exclusive />
        <EarningsCard />
        <NewsCard />

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
