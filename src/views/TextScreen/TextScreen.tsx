import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { FC, useCallback } from "react";
import { Alert, Button, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Api } from "src/api";
import { TextModel } from "src/typings/api";
import Icon from "react-native-vector-icons/Entypo"
import { screenWidth } from "src/utils/constants";
import { ButtonGroup, Tab, TabView } from "react-native-elements";
import ActionSheetModal from "src/components/ShowModal/ActionSheetModal";
import Toast from "react-native-simple-toast";
import { isEmpty } from "src/utils";

export default function TextScreen() {
  let isMounted = true

  const [list, setList] = React.useState<TextModel[]>([])
  const [showVisible, setShowVisible] = React.useState(false)
  const [curText, setCurText] = React.useState<TextModel>({} as TextModel)
  const [isEdit, setIsEdit] = React.useState(false)
  const inp = React.useRef<TextInput>(null)
  const [text, setText] = React.useState("")

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, []),
  );

  React.useEffect(() => {
    if (isEdit) {
      inp.current?.focus()
    }
  }, [isEdit])

  React.useEffect(() => {
    return () => { isMounted = false }
  }, [])

  const loadData = async () => {
    const res = await Api.getTextList()
    if (isMounted) {
      setList([...res])
    }

  }

  const save = async () => {
    if (isEmpty(text.trim())) return Toast.show("任务不能为空")
    await Api.createText({ text: text })
    Toast.show('保存成功')
    setText("")
    loadData()
  }

  const changeStatus = async (status) => {
    await Api.updateText({ id: curText.id, status })
    loadData()
    Toast.show('修改成功')
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} edges={['top', 'left', 'right']}>

      <FlatList<TextModel>
        data={list}
        style={{ width: screenWidth, }}
        ListHeaderComponent={
          <>
            <View style={styles.topBox}>
              <TextInput style={styles.topInp}
                onChangeText={setText}
                value={isEdit ? "" : text}
              />
              <TouchableOpacity style={styles.topBtn} activeOpacity={.6} onPress={save}>
                <Text>保存</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) =>

          <View style={styles.item}>
            {
              (curText.id == item.id && isEdit) ?
                <TextInput
                  style={styles.input}
                  ref={inp}
                  placeholder={curText.text}
                  onChangeText={setText}
                  onBlur={() => {
                    if (curText.text == text) return (setIsEdit(false), setText(""))
                    Alert.alert("提示", "确定要保存吗", [
                      {
                        text: "取消", onPress: () => {
                          setCurText({} as TextModel)
                          setText("")
                          setIsEdit(false)
                        }
                      },
                      {
                        text: "保存", onPress: async () => {
                          await Api.updateText({ id: curText.id, text: text })
                          Toast.show("保存成功")
                          setCurText({} as TextModel)
                          setText("")
                          setIsEdit(false)
                          loadData()
                        }
                      }
                    ])

                  }}
                  value={text}
                ></TextInput> :
                <Text style={styles.text} onLongPress={() => {
                  setCurText({ ...item })
                  setText(item.text)
                  setIsEdit(true)
                }}>{item.text}</Text>
            }



            <TouchableOpacity style={styles.right} onPress={() => {
              setCurText({ ...item })
              setShowVisible(true)
            }}>
              <Icon name="dots-three-vertical" style={{ fontSize: 20, }} />
            </TouchableOpacity>

          </View>



        }
        keyExtractor={item => item.id}
      />


      {showVisible && <ActionSheetModal
        onClose={setShowVisible}
        list={[
          {
            title: "删除", onPress: () => {
              Alert.alert("提示", "您确定要删除吗?", [
                {
                  text: "取消", onPress: () => {
                    setCurText({} as TextModel)
                    setIsEdit(false)
                  }
                },
                {
                  text: "确定", onPress: () => {
                    changeStatus(0)
                  }
                }
              ])
            },
          },
        ]} operates={[
          { title: "取消", onPress: () => (setShowVisible(false), setIsEdit(false)) },
        ]} />}

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  topBox: {
    height: 56,
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2196F3",
    paddingHorizontal: 10,
  },
  topBtn: {
    width: 50,
    height: 38,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  topInp: {
    flex: 1,
    height: 38,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginRight: 16,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 18,
    marginHorizontal: 16,
    fontWeight: "bold",
  },
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
    marginHorizontal: 16,
    fontWeight: "bold",
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

