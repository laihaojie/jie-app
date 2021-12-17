import React, { FC, useEffect, useState } from "react";
import { Image, ImageBackground, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenHeight, screenWidth } from "src/utils/constants";
import { navigate } from "src/utils/navigationService";

interface IProps {
  onClose: Function,
}

export default function FirstHongBao({ onClose }: IProps) {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    if (!modalVisible) {
      onClose(false)
    }
  }, [modalVisible])

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.7)" />
      <View style={styles.modalView}>

        <ImageBackground style={styles.hong_bao} resizeMode="stretch" source={require("../../assets/image/bgchonbao.png")} >
          <Image style={styles.price} resizeMode="center" source={require("../../assets/image/money50.png")}></Image>
          <View style={styles.login}>
            <Text style={styles.login_text} onPress={() => (setModalVisible(!modalVisible), navigate("LoginScreen"))}>Go  login</Text>
          </View>
          {/* <View style={styles.text}>
            <Text style={styles.text_text}>Login has side benefits</Text>
          </View> */}


          {/* <Text style={styles.bText}>Receive red envelopes every
            day and withdraw cash</Text> */}

        </ImageBackground>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
          <Image style={styles.close} source={require("../../assets/image/close.png")} />
        </TouchableOpacity>
      </View>
    </Modal >

  )
}

const styles = StyleSheet.create({
  price: {
    position: "absolute",
    width: screenWidth,
    height: 60,
    top: 50,
  },
  text: {
    position: "absolute",
    width: screenWidth,
    bottom: 94,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  text_text: {
    color: "##FFFFFF",
    fontSize: 18,
  },
  login: {
    position: "absolute",
    width: screenWidth,
    bottom: 94,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,

  },
  login_text: {
    color: "#F41100",
    fontSize: 27,
    fontWeight: "bold",
  },
  bText: {},
  close: {
    width: 44,
    height: 44,
    marginTop: 20,
  },
  hong_bao: {
    width: screenWidth,
    height: 370,
    position: "relative",
  },
  modalView: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
})