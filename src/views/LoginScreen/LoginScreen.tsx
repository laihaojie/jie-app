import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { SafeAreaView, TextInput, View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import { screenWidth } from "src/utils/constants";
import { Api } from "src/api";
import { isEmpty } from "src/utils";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/store/actions";
import Toast from "react-native-simple-toast";
import { selectAccount } from "src/store/selectors";

const LoginScreen: FC<NativeStackHeaderProps> = () => {
  const dispatch = useDispatch()
  const [account, setAccount] = useState(useSelector(selectAccount))
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [disabledLogin, setDisabledLogin] = useState(false)



  const handleLogin = async () => {
    if (isEmpty(account)) return Toast.show("手机号格式不正确")
    if (isEmpty(password)) return Toast.show("密码不能为空")
    setDisabledLogin(true)
    Api.login({ account, password }).then(async res => {
      setDisabledLogin(false)
      dispatch(actions.setToken(res))
      dispatch(actions.setAccount(account))
      const user = await Api.getUserInfo()
      dispatch(actions.setUser(user))
    }).catch(e => {
      Toast.show(e)
      setDisabledLogin(false)
    })


  }


  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo}
        resizeMode="center"
        source={{ uri: "https://s.huihuizi.top/public/images/zjNJnTsBiN6xk6P.jpg" }}></Image>
      <View style={styles.inputBox}>
        <Icon name="phone" size={20} color="#ccc"></Icon>
        <TextInput
          style={styles.input}
          placeholder="请输入账号"
          onChangeText={setAccount}
          value={account}
        ></TextInput>
      </View>

      <View style={styles.inputBox}>
        <Icon name="eyeo" size={20} color="#ccc"></Icon>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="请输入密码"
          onChangeText={setPassword}
          value={password}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.save} disabled={disabledLogin} onPress={handleLogin}>
        <Text style={{ color: "white" }}>{
          disabledLogin ? "登录中..." : "登录"
        } </Text>
      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: 100,
  },
  send: {
    backgroundColor: "#1186F0",
    padding: 5,
    borderRadius: 6,
  },
  save: {
    backgroundColor: "#1186F0",
    marginTop: 20,
    height: 40,
    width: screenWidth * 0.7,
    padding: 5,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: 'center',
  },
  container: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  text: {
    marginTop: 50,
  },
  inputBox: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    width: "70%",
  },
  input: {
    flex: 1,
    marginLeft: 5,
  },
})

export default LoginScreen

