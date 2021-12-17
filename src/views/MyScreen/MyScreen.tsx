import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect, useDispatch } from "react-redux"
import { Button, Input } from 'react-native-elements'
import { SafeAreaView } from "react-native-safe-area-context";
import AlreadyLoggedCard from "../HomeScreen/AlreadyLoggedCard";
import { screenWidth } from "src/utils/constants";
import Cell from "src/components/Cell/Cell";
import { navigate } from "src/utils/navigationService";

const MyScreen: FC<NativeStackHeaderProps> = () => {


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['left', 'right']}>
      <ScrollView>


        <AlreadyLoggedCard isShowMessage={true} />

        <View style={styles.radius}></View>

        <View style={styles.asset}>
          <Text style={styles.title}>Asset details</Text>
          <View style={styles.tables}>
            <View style={styles.item}>
              <Text style={{ color: "#000000", }}>Totalinvestmentprofit </Text>
              <Text style={{ color: "#000000", }}>RS：+200.34 </Text>
            </View>
            <View style={styles.item}>
              <Text style={{ color: "#000000", }}>Totalinvestmentprofit </Text>
              <Text style={{ color: "#000000", }}>RS：+200.34 </Text>
            </View>
            <View style={styles.item}>
              <Text style={{ color: "#000000", }}>Totalinvestmentprofit </Text>
              <Text style={{ color: "#000000", }}>RS：+200.34 </Text>
            </View>
            <View style={styles.item}>
              <Text style={{ color: "#000000", }}>Totalinvestmentprofit </Text>
              <Text style={{ color: "#000000", }}>RS：+200.34 </Text>
            </View>

          </View>
        </View>

        <View style={styles.list}>
          <Cell source={require("../../assets/image/money.png")} onPress={() => navigate("MessageCenterScreen")} title="withdrawable amount" rightText="Rs33000" />
          <Cell source={require("../../assets/image/money.png")} title="Order details" />
          <Cell source={require("../../assets/image/money.png")} title="Task details" />
          <Cell source={require("../../assets/image/money.png")} title="My bank card" rightText="Unbound card" />
          <Cell source={require("../../assets/image/money.png")} title="About US" border={false} />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 16,
  },
  tables: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: "#ccc",
    borderRightColor: "#ccc",
  },
  item: {
    width: (screenWidth - 65) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    borderTopColor: "#ccc",
    height: 66,

  },
  title: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 10,
  },
  asset: {
    width: screenWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#fff",
    marginTop: -36,
    borderRadius: 10,
    padding: 16,
  },
  radius: {
    flex: 1,
    height: 40,
    backgroundColor: "#55C1F0",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,

  }
})

export default MyScreen
