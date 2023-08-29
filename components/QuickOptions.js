import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const QuickOptions = ({
  setoptions,
  setContent,
  options,
  setclick_fetch,
  fetch_feeddata,
  collection_Name,
  setcollection_Name,
  setFeedId,
}) => {
  const navigation = useNavigation();
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const deleteCategory = (index) => {
    setCategoryToDelete(index);
  };

  const confirmDeleteCategory = async () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the "${options[categoryToDelete].name}" category?`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setCategoryToDelete(null),
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setCategoryToDelete(null);
            const newOptions = [...options];
            newOptions.splice(categoryToDelete, 1);
            setFeedId("");
            setContent([]);
            setcollection_Name(null);
            navigation.navigate("Home");
            setoptions(newOptions);
            setclick_fetch(false);
            await AsyncStorage.setItem("options", JSON.stringify(newOptions));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.options}>
      <View style={{ width: "93%", height: "100%" }}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            style={styles.add}
            onPress={() => {
              navigation.navigate("Categories");
            }}
          >
            <Ionicons name="add-outline" size={30} color="white" />
          </TouchableOpacity>
          
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.bg,
                {
                  backgroundColor:
                    item.name === collection_Name
                      ? "#FFE385"
                      : "rgba(255, 255, 255, 0.10)",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
              onPress={() => {
                fetch_feeddata(index),
                  setcollection_Name(item.name),
                  setclick_fetch(true);
              }}
              onLongPress={() => deleteCategory(index)}
            >
              <Text
                adjustsFontSizeToFit
                style={{
                  color: item.name === collection_Name ? "#111" : "#fff",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {item.name}
              </Text>
              {categoryToDelete === index && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={confirmDeleteCategory}
                >
                  <Ionicons name="trash" size={18} color="#fff" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default QuickOptions;

const styles = StyleSheet.create({
  options: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "center",
    height: 54,
    backgroundColor: "#1a1b1f",
  },
  bg: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    marginRight: 8,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  add: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    aspectRatio: 1 / 1,
    height: "100%",
    borderRadius: 100,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 5,
  },
});
