import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux"
import { Button, Input, Tab, TabView } from 'react-native-elements'
import { useNavigation } from "@react-navigation/core";
import { selectToken } from "src/store/selectors";
import { navigate } from "src/utils/navigationService";
import Header from "src/components/Header/Header";
import BillItem from "./BillItem";
import { screenWidth } from "src/utils/constants";

function BillDetailScreen() {
  const [index, setIndex] = useState(1)

  return (
    <SafeAreaView>
      <Header title="Bill details" />

      <ScrollView style={{ width: screenWidth }}>


        <Tab value={index} onChange={setIndex} >
          <Tab.Item title="全部" />
          <Tab.Item title="红包" />
          <Tab.Item title="任务" />
        </Tab>
        <TabView value={index} onChange={setIndex} >
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <BillItem />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
            <Text >Favorite</Text>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
            <Text >Cart</Text>
          </TabView.Item>
        </TabView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BillDetailScreen