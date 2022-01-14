import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Api } from "src/api";
import { Task } from "src/typings/api";

export default function TaskScreen() {
  let isMounted = true

  const [list, setList] = React.useState<Task[]>([])

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, []),
  );

  React.useEffect(() => {
    return () => { isMounted = false }
  }, [])

  const loadData = async () => {
    const res = await Api.getTaskList({ status: 1 })
    if (isMounted) {
      setList([...res])
    }

  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>
      <ScrollView>




        <Text style={styles.title}>事件代办页面</Text>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  title: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 10,
  },

})

