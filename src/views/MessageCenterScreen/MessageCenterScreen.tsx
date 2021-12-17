
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect, useDispatch } from "react-redux"
import { Button, Input } from 'react-native-elements'
import { SafeAreaView } from "react-native-safe-area-context";
import AlreadyLoggedCard from "../HomeScreen/AlreadyLoggedCard";
import { screenWidth } from "src/utils/constants";
import Cell from "src/components/Cell/Cell";
import { navigate } from "src/utils/navigationService";
import Header from "src/components/Header/Header";
import Icon from "react-native-vector-icons/AntDesign";
import BillItem from "./BillItem";

function MessageCenterScreen() {


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['left', 'right']}>
      <Header title="Message center" />
      <ScrollView>

        <View style={styles.radius}></View>
        <View style={styles.asset}>

          <Text style={styles.title}>Withdrawable amoun</Text>
          <Text style={styles.price}>33000.00</Text>

          <View style={styles.btn_s}>
            <TouchableOpacity style={styles.btn_left}>
              <Text style={{ color: "#fff" }}>充值</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_right}>
              <Text style={{ color: "#fff" }}>提现</Text>
            </TouchableOpacity>
          </View>

        </View>


        <View style={styles.details}>
          <View style={styles.top}>
            <Text style={styles.title}>Bil details</Text>
            <Text onPress={() => navigate("BillDetailScreen")}>more <Icon name="doubleright" /> </Text>
          </View>

          {
            new Array(5).fill(1).map((_, i) =>
              <BillItem key={i} />
            )

          }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  details: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#fff"
  },
  btn_left: {
    backgroundColor: "#F76600",
    height: 26,
    width: 68,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_right: {
    backgroundColor: "#55C1F0",
    height: 26,
    width: 68,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_s: {
    width: screenWidth - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    color: "#333",
    fontSize: 18,
  },
  price: {
    fontSize: 33,
    color: "#FF0000",
    fontWeight: "bold",
    margin: 20,
  },
  asset: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#fff",
    marginTop: -90,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  radius: {
    width: screenWidth,
    height: 100,
    backgroundColor: "#55C1F0",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,

  }
})

export default MessageCenterScreen
