import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as rssParser from "react-native-rss-parser"
const Add_rss = () => {

    const handlepress=()=>{
    fetch('https://www.reddit.com/r/FapDungeonss/.rss')
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      console.log(rss);
      navigation.navigate("Addcategory",{name:rss.categories[0].name,img:rss.image.url,feedId:'https://www.reddit.com/r/FapDungeonss/.rss',FeedName:rss.categories[0].name})
    })
    }

  const [search_rss, setsearch_rss] = useState("");
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.contain} enabled>
      <View style={[styles.window, { height: "30%" }]}>
        <View style={styles.nav}>
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "500",
                fontSize: 24,
                width: "100%",
                textAlign: "center",
              }}
            >
              Add a feed
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <EvilIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.search}>
            <View
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={[
                  styles.input,
                  { color: "#fff", fontWeight: "500", fontSize: 18 },
                ]}
                onChangeText={setsearch_rss}
                value={search_rss}
                placeholder="Enter a feed url"
                placeholderTextColor="#888"
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
                paddingVertical:7,
              paddingHorizontal: 20,
              backgroundColor: "#0a95ff",
              borderRadius: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handlepress}
          >
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Add_rss;

const styles = StyleSheet.create({
  contain: {
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  window: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    borderRadius: 10,
    backgroundColor: "#1a1b1f",
  },
  gridView: {},
  content: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingHorizontal:10,
    flex: 1,
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
  },
  nav: {
    position: "relative",
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.20)",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "space-between",
  },
  search: {
    width: "100%",
    height: "25%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topic: {
    height: "84.9%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  form: {
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    width: "100%",
    flex: 1,
  },
  btn: {
    height: "100%",
    width: "100%",
  },
  input: {
    height: "90%",
    width: "90%",
  },
});
