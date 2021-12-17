import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Api } from "src/api";
import Task from "src/components/Screen/Task";
import { MyTask, Task as ITask } from "src/typings/api";
import { screenWidth } from "src/utils/constants";



const TaskScreen: FC<NativeStackHeaderProps> = () => {
  const [myTask, setMyTask] = useState<MyTask>({ tasks: [], total: 0 })
  useFocusEffect(
    useCallback(() => {
      loadData()
    }, []),
  );


  const loadData = async () => {
    const res = await Api.getMyTask()
    setMyTask(res)
    console.log(res);

  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['left', 'right']}>
      <FlatList<ITask>
        data={myTask.tasks}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={styles.title}>Task</Text>
              <Text style={styles.text}>My commission</Text>
              <Text style={styles.price}>{myTask.total}</Text>
              <TouchableOpacity style={styles.sign} >
                <Text style={{ color: "white" }}>To extracts</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tip}>
              <Text style={{ color: "black", fontWeight: "bold" }}>Do tasks to get cash</Text>
            </View>
          </>
        }
        renderItem={({ item }) => <Task item={item} sat={myTask.sat!!} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tip: {
    height: 28,
    backgroundColor: "#FDE4A6",
    alignItems: "center",
    justifyContent: "center",
    width: 163,
    marginBottom: 16,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 14,
  },
  text: {
    color: "#DBF2FB",
    marginBottom: 17,
    marginTop: 15,
    lineHeight: 16,
  },
  price: {
    fontSize: 27,
    fontWeight: "bold",
    color: "white",
    lineHeight: 27,
  },
  sign: {
    backgroundColor: "#F76600",
    width: 82,
    height: 27,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 19,
    marginTop: 12,
  },
  title: {
    color: "#DBF1FB",
    fontSize: 22,
  },
  container: {
    backgroundColor: "#55C1F0",
    width: screenWidth,
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
})
export default TaskScreen
