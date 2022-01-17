import React, { useEffect, useState } from "react"
import { Button, Text, ScrollView, View, DevSettings, NativeModules, Alert, Linking } from "react-native"
import { useDispatch, useSelector, } from "react-redux"
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import actions from "src/store/actions"
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from "src/utils/navigationService"
import { selectLocalAll, selectToken, selectUser } from "src/store/selectors"
import Header from "src/components/Header/Header"
import Toast from "react-native-simple-toast";
import ActionSheetModal from "src/components/ShowModal/ActionSheetModal";
import UpdateAPK from "jie-rn-update-apk"
import ProgressModal from "src/components/ShowModal/ProgressModal";
import { socketUrl } from "src/utils/constants";


export default function TestScreen({ navigation }) {
  const token = useSelector(selectToken)

  const user = useSelector(selectUser)
  const local = useSelector(selectLocalAll)
  const dispatch = useDispatch()

  const [count, setCount] = useState(0)

  const [isModalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [progress, setProgress] = useState(0)
  const [progressModalVisible, setProgressModalVisible] = useState(false)

  const updater = React.useMemo(() => new UpdateAPK({
    apkVersionUrl: `https://api-inapp.lingman.tech/api/Public/dev/androidversion`,
    version: "1.0.0",
    apkVersionOptions: {
      method: 'GET',
      headers: {

      }
    },
    apkOptions: {
      headers: {}
    },
    fileProviderAuthority: "com.inapp.amb.fileprovider",
    needUpdateApp: (performUpdate, remote) => {
      Alert.alert(
        "有一个新的版本",
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

    notNeedUpdateApp: () => {

    },
    downloadApkStart: () => {
      setProgressModalVisible(true)
      // console.log("开发更新版本号=================", version);
    },

    downloadApkProgress: progress => {
      setProgress(progress)
    },

    // This is called prior to the update. If you throw it will abort the update
    downloadApkEnd: (remote) => {
      setProgressModalVisible(false)
    },

    onError: err => {
      console.log("onError callback called", err);
      Alert.alert("There was an error", err.message);
    }
  })

    , [])


  return (

    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>
        <Button title="设置TOKEN" onPress={() => dispatch(actions.setToken("这是token"))} />
        <Button title="退出" onPress={() => dispatch(actions.logout())} />
        <Button title="清空缓存" onPress={() => dispatch(actions.clearAll())} />
        <Button title="显示弹窗" onPress={() => setModalVisible(!isModalVisible)} />
        <Button title="重启JS" onPress={() => DevSettings.reload()} />
        <Button title="下载到最新版" onPress={() => updater.checkUpdate()} />
        <Button title="按钮" onPress={() => {

        }} />


        <Text onPress={() => setCount(count + 1)}>{count}</Text>
        {
          !!local && Object.keys(local).map(i => {
            return <Text key={i}>{i}   <Text>{JSON.stringify(local[i])}</Text> </Text>
          })
        }

        <Text>{token}</Text>

        {/* // 下载进度条弹窗 */}
        {progressModalVisible && <ProgressModal onClose={setProgressModalVisible} progress={progress}></ProgressModal>}
        <Modal isVisible={isModalVisible} style={{ margin: 0 }} >

          <View style={{ flex: 1, backgroundColor: "blue", justifyContent: "flex-end", margin: -10 }}>
            <View style={{ height: 400, backgroundColor: "red" }}>
              <Text>Hello!</Text>

              <Button title="Hide modal" onPress={() => setModalVisible(false)} />
            </View>
          </View>

        </Modal>

      </ScrollView>
    </SafeAreaView>


  );
}
