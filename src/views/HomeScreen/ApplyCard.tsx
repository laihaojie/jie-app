import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "src/utils/constants";

export default function ApplyCard() {

  return (

    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topLeft}>View Indian shopkeeper
          support program</Text>
        <Text style={styles.topRight}>Freedom to go to work
          timely salary</Text>
      </View>

      <View style={styles.center}>
        <Image style={styles.logo} source={require('../../assets/image/market.png')} />
        <View style={styles.texts}>
          <Text style={styles.one}>You have time!  </Text>
          <Text style={styles.two}>You want to make money! </Text>
          <Text style={styles.three}>You are willing to work hard!</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomLeft}>Then apply now !</Text>
        <TouchableOpacity style={styles.bottomRight} >
          <Text style={{ color: "white", fontSize: 18, }}>apply</Text>
        </TouchableOpacity>
      </View>
    </View>


  )


}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 30,
  },
  bottomLeft: {
    color: "#2BAB90",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomRight: {
    width: 77,
    height: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55C1F0",
    borderRadius: 6,
  },
  texts: {},
  one: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FF0000",
  },
  two: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#55C1F0",
    marginTop: 10,
    marginBottom: 10,
  },
  three: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#C818BE",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 16,
    marginRight: 50,
  },
  center: {
    alignItems: "center",
    flexDirection: "row",
    margin: 15,
  },

  topLeft: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "600",
    width: 204,
    marginLeft: 14,

  },
  topRight: {
    flex: 1,
    color: "#999999",
    fontWeight: "500",
  },
  top: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  container: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
})
