import React, { useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { screenWidth } from "src/utils/constants";
import { navigate } from "src/utils/navigationService";





export default function LoginCard() {
  return (

    <View style={styles.container}>
      <Text style={styles.title}>Rupee International</Text>
      <TouchableOpacity style={styles.sign} onPress={() => navigate("LoginScreen")}>
        <Text style={{ color: "white" }}>Sign in</Text>
      </TouchableOpacity>
      <Text style={styles.bottom}>Sign in for more benefits</Text>
    </View>


  );
}

const styles = StyleSheet.create({
  bottom: {
    color: "#DBF2FB",
    marginBottom: 10,
  },
  sign: {
    backgroundColor: "#F76600",
    width: 82,
    height: 27,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  title: {
    color: "#DBF1FB",
    fontSize: 22,
  },
  container: {
    backgroundColor: "#55C1F0",
    width: screenWidth,
    height: 160,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
})