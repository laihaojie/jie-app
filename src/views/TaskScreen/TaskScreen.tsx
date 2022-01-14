import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Api } from "src/api";
import { Task } from "src/typings/api";
import Icon from "react-native-vector-icons/Entypo"
import { screenWidth } from "src/utils/constants";
import { ButtonGroup, Tab, TabView } from "react-native-elements";

export default function TaskScreen() {
  let isMounted = true

  const [list, setList] = React.useState<Task[]>([])
  const [index, setIndex] = React.useState(0);

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [index]),
  );


  React.useEffect(() => {
    return () => { isMounted = false }
  }, [])

  const loadData = async () => {
    const res = await Api.getTaskList({ status: index + 1 })
    if (isMounted) {
      setList([...res])
    }

  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>


      <FlatList<Task>
        data={list}
        style={{ width: screenWidth, }}
        ListHeaderComponent={
          <>
            <ButtonGroup
              buttons={['全部', '已完成', '待处理', '已删除']}

              selectedIndex={index}
              onPress={setIndex}
              containerStyle={{}}
              selectedButtonStyle={{ backgroundColor: "#2196F3" }}
            />

          </>
        }
        renderItem={({ item }) =>

          <View style={styles.item}>
            <Text style={styles.text}>{item.task}</Text>
            <TouchableOpacity style={styles.right}>
              <Icon name="dots-three-vertical" style={{ fontSize: 20, }} />
            </TouchableOpacity>

          </View>



        }
        keyExtractor={item => item.id}
      />




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  right: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 10,
  },

})

