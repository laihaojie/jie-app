import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "src/utils/constants";
import LinearGradinet from 'react-native-linear-gradient';
import { navigate } from "src/utils/navigationService";

export default function WithdrawCard() {

  return (

    <View style={styles.container}>
      <Text style={styles.text}>您当前的可提现金额为：</Text>
      <Text style={styles.price}>￥ 50.00</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigate("WithdrawalScreen")}>
        <Text style={{ color: "white" }}>提现</Text>
      </TouchableOpacity>
    </View>



  )


}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: "#fff",
    height: 26,
    borderRadius: 13,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 28,
    bottom: 10,
  },
  text: {
    fontSize: 13,
    color: "#fff",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#fff',
    marginTop: 5,
  },
  container: {
    backgroundColor: "#F76600",
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 6,
    height: 66,
    paddingLeft: 35,
    marginBottom: 12,
    justifyContent: "center",
    position: 'relative',
  },
})
