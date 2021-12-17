import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useEffect, useRef, useState } from "react";
import { SafeAreaView, TextInput, View, Image, StyleSheet, Button, Alert, TouchableOpacity, Text } from "react-native";
import { navigate } from "src/utils/navigationService";
import Icon from "react-native-vector-icons/AntDesign"
import { screenWidth } from "src/utils/constants";
import { Api } from "src/api";
import { isEmpty, isMobile } from "src/utils";
import Toast from 'react-native-root-toast';
import { useDispatch } from "react-redux";
import actions from "src/store/actions";

const LoginScreen: FC<NativeStackHeaderProps> = () => {
  const dispatch = useDispatch()
  const [times, setTimes] = useState(60)
  const [mobile, setMobile] = useState("17608421492")
  const [code, setCode] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [disabledLogin, setDisabledLogin] = useState(false)
  const intervalRef = useRef<any>(null)


  useEffect(() => {
    clearInterval(intervalRef.current);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {
    if (times <= 0) {
      setDisabled(false)
      setTimes(60)
      clearInterval(intervalRef.current);
    }
  }, [times]);
  const send = async () => {
    clearInterval(intervalRef.current);
    if (isEmpty(mobile)) return Toast.show("手机号不能为空")
    if (!isMobile(mobile)) return Toast.show("手机号格式不正确")

    setDisabled(true)

    intervalRef.current = setInterval(() => {
      setTimes((val) => --val)
    }, 1000);
    Api.sendSms({ mobile, type: "register", }).then(res => {
      Toast.show("发送成功", {})
    })

  }

  const handleLogin = async () => {
    if (!isMobile(mobile)) return Toast.show("手机号格式不正确")
    if (isEmpty(code)) return Toast.show("验证码不能为空")

    setDisabledLogin(true)
    Api.login({ mobile, code, sid: "" }).then(async res => {
      dispatch(actions.setToken(res))
      const user = await Api.getUserInfo()
      dispatch(actions.setUser(user))
      navigate("home")
    }).catch(e => {
      Toast.show(e)
      setDisabledLogin(false)
    })


  }


  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo}
        resizeMode="center"
        source={{ uri: "https://s.lingman.tech/taohupai/images/logo-blue1.png" }}></Image>
      <View style={styles.inputBox}>
        <Icon name="phone" size={20} color="#ccc"></Icon>
        <TextInput
          style={styles.input}
          placeholder="请输入手机号"
          onChangeText={setMobile}
          value={mobile}
        ></TextInput>
      </View>

      <View style={styles.inputBox}>
        <Icon name="eyeo" size={20} color="#ccc"></Icon>
        <TextInput
          style={styles.input}
          placeholder="请输入验证码"
          onChangeText={setCode}
        ></TextInput>
        <TouchableOpacity style={styles.send} disabled={disabled} onPress={send}>
          {
            disabled ?
              <Text style={{ color: "white" }}>{times}s</Text> :
              <Text style={{ color: "white" }}>获取验证码</Text>
          }
        </TouchableOpacity>
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

