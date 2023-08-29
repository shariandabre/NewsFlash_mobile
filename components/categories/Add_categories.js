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
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Add_categories = ({ route }) => {
  const navigation = useNavigation();
  const [categoriesName, setcategoriesName] = useState();
  const [newcategories, setnewcategories] = useState(true);

  var options = route.params.options;
  useEffect(() => {
    for (i = 0; i < options.length; i++) {
      if (categoriesName === options[i].name) {
        setnewcategories(true);
      } else {
        setnewcategories(false);
      }
    }
  }, [categoriesName]);

  const handlePress = () => {
    if(categoriesName!==""){
    setcategoriesName(categoriesName.trim());
    route.params.Push_Option(
      categoriesName,
      route.params.FeedName,
      route.params.feedId,
      route.params.img
    );
    // setsearch("");
    setcategoriesName("");
    navigation.navigate("Home");}
  };

  return (
    <KeyboardAvoidingView style={styles.contain} enabled>
      <View style={[styles.window, { height: "50%" }]}>
        <View style={[styles.nav, { height: "15%" }]}>
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
              Add Feed
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              // setsearch("");
            }}
          >
            <EvilIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.form}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flex: 1,
              }}
            >
              <Image
                source={{ uri: route.params.img }}
                style={{
                  height: "70%",
                  resizeMode: "center",
                  aspectRatio: 1 / 1,
                  borderRadius: 15,
                  borderColor: "rgba(255, 255, 255, 0.05)",
                  borderWidth: 0.7,
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flex: 1,
                paddingTop: 10,
              }}
            >
              <View style={[styles.search, { flex: 1 }]}>
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    borderRadius: 10,
                    display: "flex",
                    paddingHorizontal:20,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.input,
                      {
                        color: "#fff",
                        fontWeight: "500",
                        fontSize: 18,
                        textAlignVertical: "center",
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {route.params.name}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.search,
                  {
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  },
                ]}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    paddingHorizontal:20,
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: "#fff",
                        fontWeight: "500",
                        fontSize: 18,
                      },
                    ]}
                    value={categoriesName}
                    onChangeText={setcategoriesName}
                    placeholder="Category"
                    placeholderTextColor="#888"
                  />
                  {!newcategories && 
                  <MaterialIcons
                    name="create-new-folder"
                    size={24}
                    color="white"
                  />}
                </View>
              </View>
              <View
                style={[
                  styles.search,
                  { flex: 1, marginBottom: 0, alignItems: "flex-end" },
                ]}
              >
                <TouchableOpacity
                  style={{
                    height: "90%",
                    paddingHorizontal: 20,
                    backgroundColor: "#0a95ff",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={handlePress}
                >
                  <MaterialIcons name="playlist-add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Add_categories;

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
    backgroundColor: "#1a1b1f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: "70%",
    borderRadius: 20,
  },
  gridView: {},
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    borderRadius: 10,
    // backgroundColor: "rgba(255, 255, 255, 0.70)",
    padding: 10,
  },
  nav: {
    position: "relative",
    width: "100%",
    height: "10%",
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
    height: "8.5%",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
