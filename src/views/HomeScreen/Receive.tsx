import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "src/utils/constants";

export default function Receive() {

  return (

    <View style={styles.container}>
      <Text style={{ marginBottom: 6, color: "black" }}>You can receive red envelopes 3 times a day</Text>
      <View style={styles.info}>
        <Image style={styles.logo} source={require("../../assets/image/hblogo.png")} />

        <Text style={styles.text}>Receive red envelopes every day and withdraw cash</Text>
        <TouchableOpacity style={styles.btn} >
          <Text style={{ color: "white" }}>Receive</Text>
        </TouchableOpacity>
      </View>


    </View>


  )


}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    color: "black",
    marginLeft: 10,
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 40,

  },
  btn: {
    backgroundColor: "#55C1F0",
    borderRadius: 6,
    padding: 6,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#E5E5E5",
  },
})
