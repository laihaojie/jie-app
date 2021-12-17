
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenWidth } from "src/utils/constants";
import Icon from "react-native-vector-icons/AntDesign"

export default function Exclusive() {

  return (

    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.small}></View>
        <View style={styles.big}></View>
        <Text style={styles.titleText}>新人专享</Text>
        <View style={styles.big}></View>
        <View style={styles.small}></View>
      </View>

      <View style={styles.center}>
        <View style={styles.left}>
          <Text style={styles.ratio}>9.80%</Text>
          <Text style={styles.exp}>Expected rate of
            return per period</Text>

        </View>
        <View style={styles.right}>
          <Text style={styles.info}>10000 ruppes can eam 100 ruppes per day
            ( you can withdraw money per day) </Text>
          <Text style={styles.info}>Earn 6000 rupees at maturity </Text>
          <Text style={styles.exp}>Term 0 year 6 day </Text>

        </View>

      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.profit} >
          <Text style={{ color: "white" }}>Profit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>only 1 time</Text>
      </View>

    </View>



  )


}

const styles = StyleSheet.create({
  banner: {
    width: 100,
    backgroundColor: "#FF0000",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: -20,
    top: 22,
    transform: [{ rotate: '45deg' }]

  },
  bannerText: {
    fontSize: 11,
    color: "#FFFFFF",
  },
  profit: {
    width: 160,
    height: 33,
    backgroundColor: "#FF0000",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",

  },
  bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  info: {
    color: "#333333",
    marginBottom: 5,
  },
  exp: {
    fontSize: 11,
    color: "#999999",
  },
  ratio: {
    fontSize: 22,
    color: "#FF0000",
    fontWeight: "bold",
  },
  left: {
    flex: 6,
    alignItems: "center",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#E5E5E5",
  },
  right: {
    flex: 17,
    paddingRight: 12,
    paddingLeft: 12,
  },
  center: {
    flexDirection: "row",
  },
  small: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#FF0000",
  },
  big: {
    width: 5,
    height: 5,
    backgroundColor: "#FF0000",
    borderRadius: 5,
    margin: 5,
  },

  titleText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "500",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 19,
    marginBottom: 12,
  },

  container: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    position: "relative",
    overflow: "hidden",
  },
})
