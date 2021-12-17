import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { screenWidth } from "src/utils/constants";

export default function Advertising() {
  return (
    <ImageBackground style={styles.container} resizeMode="stretch" source={require("../../assets/image/advertising.png")} >


    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    height: 120,
    marginBottom: 12,
  },
})