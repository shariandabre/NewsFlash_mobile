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
import { MaterialIcons } from '@expo/vector-icons'; 
import { FlatGrid } from "react-native-super-grid";
import { FontAwesome } from "@expo/vector-icons";
import Dis_feed from "../discover/Dis_feed";
import { useEffect, useState } from "react";

const Select_categories = ({ route }) => {
  const navigation = useNavigation();
  const [FeedName, setFeedName] = useState();
  const [search, setsearch] = useState("");
  const [topic_data, setTopic_data] = useState([]);
  
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    if (search !== "" && search[0] === "#" && search.length > 1) {
      const search_str =
        search.substring(0, 1 - 1) + search.substring(1, search.length);

      fetch(
        `https://api.feedly.com/v3/recommendations/topics/${search_str}?locale=en&count=20`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((data) => {
          setTopic_data(data.feedInfos);
        });
    } else if (search !== "" && search[0] !== "#") {
      fetch(
        `https://api.feedly.com/v3/search/feeds?query=${search}&count=20&locale=en`,
        requestOptions
      )
        .then((Response) => Response.json())
        .then((data) => {
          setTopic_data(data.results);
        });
    }
  }, [search]);
  return (
    <KeyboardAvoidingView style={styles.contain} enabled>
      <View style={[styles.window, { height: "70%" }]}>
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
              Discover
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setsearch("");
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
                onChangeText={setsearch}
                value={search}
                placeholder="Search"
                placeholderTextColor="#888"
              />
            </View>
            {/* <TouchableOpacity
              style={{
                height: "100%",
                width: "13%",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("Addrss")
              }}
            >
              <View>
                <FontAwesome
                  name="rss"
                  size={25}
                  color={"white"}
                />
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={styles.topic}>

                {search === "" && (
                  <View style={styles.btn}>
                    <FlatGrid
                      data={[
                        "tech",
                        "news",
                        "science",
                        "sports",
                        "media",
                        "culture",
                        "food",
                        "open source",
                      ]}
                      style={styles.gridView}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => {
                            setsearch(`#${item}`);
                          }}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.10)",
                            borderRadius: 10,
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 24,
                              fontWeight: "400",
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      )}
                      itemDimension={150}
                    />
                  </View>
                )}

            {search !== "" && (
              <View style={{ paddingHorizontal: 10 }}>
                <Dis_feed
                  setFeedName={setFeedName}
                  topic_data={topic_data}
                  setTopic_data={setTopic_data}
                  feedId={route.params.feedId}
                  setfeedId={route.params.setfeedId}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Select_categories;

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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    borderRadius: 10,
    paddingVertical: 10,
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
    paddingHorizontal: 10,
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
