import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import React, { useState } from "react"
import { Button, Text, ScrollView, TextInput, View } from "react-native"
import { useDispatch, useSelector, } from "react-redux"
import { Api } from "src/api"
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import actions from "src/store/actions"
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from "src/utils/navigationService"
import { selectLocalAll, selectToken, selectUser } from "src/store/selectors"
import { Input } from "react-native-elements"

const TestScreen: React.FC<NativeStackHeaderProps> = ({ navigation }) => {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const [local, setLocal] = useState(useSelector(selectLocalAll))

  const dispatch = useDispatch()

  const [obj, setObj] = useState({})
  const [count, setCount] = useState(0)

  const getPolicy = async () => {
    const res = await Api.getPolicy()
    setObj(res)
  }
  const setApp = () => {
    dispatch(actions.setToken("这是token"))
  }
  const logout = () => {
    dispatch(actions.logout())
  }
  const clear = () => {
    dispatch(actions.clearAll())
  }
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (

    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>
        <Button title="设置TOKEN" onPress={setApp} />
        <Button title="退出" onPress={logout} />
        <Button title="清空缓存" onPress={clear} />
        <Button title="getPolicy" onPress={getPolicy} />
        <Button title="Show modal" onPress={toggleModal} />

        <Text onPress={() => setCount(count + 1)}>{count}</Text>
        <Text>{JSON.stringify(local)}</Text>
        <Text>{JSON.stringify(obj)}</Text>
        <Text onPress={() => navigate("DetailScreen")}>detail</Text>

        <Icon name="rocket" size={30} color="#900" />


        <Modal isVisible={isModalVisible} style={{ margin: 0 }} >

          <View style={{ flex: 1, backgroundColor: "blue", justifyContent: "flex-end", margin: -10 }}>
            <View style={{ height: 400, backgroundColor: "red" }}>
              <Text>Hello!</Text>

              <Button title="Hide modal" onPress={toggleModal} />
            </View>
          </View>

        </Modal>

      </ScrollView>
    </SafeAreaView>


  );
}

export default TestScreen