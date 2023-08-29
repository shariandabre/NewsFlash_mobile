import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Feed from "./Feed";
import QuickOptions from "./QuickOptions";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import MenuDrawer from "react-native-side-drawer";
export default function Home({
  setoptions,
  options,
  setdata,
  setlink,
  settitle,
  setFeedId,
}) {
  const [content, setContent] = useState([]);
  const [loadMoreFeedId, setloadMoreFeedId] = useState();
  const [click_fetch, setclick_fetch] = useState(false);
  const [newsPerPage, setNewsPerPage] = useState(10);
  const [collection_Name, setcollection_Name] = useState();
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [Feed_Index, setFeed_Index] = useState();

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  async function fetch_feeddata(index) {
    setContent([]);
    setNewsPerPage(10);
    setloadMoreFeedId();
    const articles = [];
    setloadMoreFeedId(options[index].feed_id);
    const feedUrls = options[index].feed_id.map(
      (feedUrl) =>
        `https://api.feedly.com/v3/streams/contents?streamId=${feedUrl}&count=10&ranked=newest&locale=en`
    );
    const responses = await Promise.all(
      feedUrls.map((url) => fetch(url, requestOptions))
    );
    const articleData = await Promise.all(
      responses.map((response) => response.json())
    );
    articleData.forEach((data) => {
      articles.push(...data.items);
    });
    setContent(
      articles.sort((a, b) => new Date(b.published) - new Date(a.published))
    );
  }

  async function fetch_selectedfeeddata(index, feedIndex) {
    setclick_fetch(true);
    setContent([]);
    setNewsPerPage(10);
    setloadMoreFeedId([options[index].feed_id[feedIndex]]);
    const articles = [];
    const feedUrls = `https://api.feedly.com/v3/streams/contents?streamId=${options[index].feed_id[feedIndex]}&count=10&ranked=newest&locale=en`;
    const responses = await Promise.all([fetch(feedUrls, requestOptions)]);
    const articleData = await Promise.all(
      responses.map((response) => response.json())
    );
    articleData.forEach((data) => {
      articles.push(...data.items);
    });
    setContent(
      articles.sort((a, b) => new Date(b.published) - new Date(a.published))
    );
  }

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const toggleOpenChild = () => {
    setOpenChild(!openChild);
  };
  const toggleOpen = () => {
    setOpen(!open);
  };

  const deleteCategory = (index) => {
    setCategoryToDelete(index);
  };

  const confirmDeleteCategory = async () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the "${options[selectedOptionIndex].feed_name[categoryToDelete]}" category?`,
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
            newOptions[selectedOptionIndex].feed_name.splice(
              categoryToDelete,
              1
            );
            newOptions[selectedOptionIndex].feed_id.splice(categoryToDelete, 1);
            newOptions[selectedOptionIndex].feedimg.splice(categoryToDelete, 1);
            if (options[selectedOptionIndex].feed_name.length <= 0) {
              newOptions.splice(selectedOptionIndex, 1);
            }
            setFeedId("");
            setContent([]);
            setcollection_Name(null);
            setoptions(newOptions);
            setclick_fetch(false);
            await AsyncStorage.setItem("options", JSON.stringify(newOptions));
          },
        },
      ]
    );
  };

  const drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 30,
              height: "100%",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity onPress={toggleOpen}>
                <EvilIcons name="close" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 24,
              }}
            >
              All Feeds
            </Text>
            {options.map((item, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  onPress={() => {
                    setSelectedOptionIndex(index);
                    toggleOpenChild();
                  }}
                >
                  {selectedOptionIndex === index ? (
                    <MaterialIcons
                      name={`${
                        openChild ? "arrow-drop-up" : "arrow-drop-down"
                      }`}
                      size={24}
                      color="white"
                    />
                  ) : (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="white"
                    />
                  )}
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "400",
                      fontSize: 24,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>

                {selectedOptionIndex === index && (
                  <View>
                    {openChild && (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {item.feed_name.map((feed, feedIndex) => (
                          <TouchableOpacity
                            key={feedIndex}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 5,
                            }}
                            onPress={() => {
                              fetch_selectedfeeddata(index, feedIndex),
                                setcollection_Name(item.name);
                              setFeed_Index(feedIndex);
                            }}
                            onLongPress={() => deleteCategory(feedIndex)}
                          >

                              <View
                              style={{
                                backgroundColor:'rgba(255, 255, 255, 0.20)',
                                borderRadius: 50,
                                height: 35,
                                width: 35,
                              }}
                              >
                                {item.feedimg[feedIndex] && (
                              <Image
                                source={{ uri: item.feedimg[feedIndex] }}
                                style={{
                                  borderRadius: 50,
                                  height: 35,
                                  width: 35,
                                }}
                              />
                                )}
                              </View>
                            
                            <Text
                              style={{
                                color: "#fff",
                                fontWeight: "300",
                                fontSize: 20,
                                width: "70%",
                              }}
                              numberOfLines={1}
                            >
                              {feed}
                            </Text>
                            {categoryToDelete === feedIndex && (
                              <TouchableOpacity onPress={confirmDeleteCategory}>
                                <Ionicons name="trash" size={20} color="red" />
                              </TouchableOpacity>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <ScrollView stickyHeaderIndices={[1]} scrollEnabled={open ? false : true}>
        <MenuDrawer
          open={open}
          position={"right"}
          drawerContent={drawerContent()}
          animationTime={250}
          drawerPercentage={75}
          overlay={true}
          opacity={0.7}
        >
          <View style={styles.contain}>
            <View style={[styles.head, {}]}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../assets/logo1.png")}
                  style={{
                    height: 45,
                    width: 45,
                  }}
                />
                <TouchableOpacity onPress={toggleOpen}>
                  <SimpleLineIcons
                    name="options-vertical"
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={{ color: "#fff", fontWeight: "900", fontSize: 34 }}
              >
                Your daily dose of news, all in one place.
              </Text>
            </View>
          </View>

          <View>
            <QuickOptions
              setoptions={setoptions}
              setclick_fetch={setclick_fetch}
              fetch_feeddata={fetch_feeddata}
              content={content}
              setContent={setContent}
              setFeedId={setFeedId}
              collection_Name={collection_Name}
              setcollection_Name={setcollection_Name}
              options={options}
            />
          </View>
          <Feed
            content={content}
            newsPerPage={newsPerPage}
            setNewsPerPage={setNewsPerPage}
            setContent={setContent}
            loadMoreFeedId={loadMoreFeedId}
            setdata={setdata}
            setlink={setlink}
            settitle={settitle}
            click_fetch={click_fetch}
          />
        </MenuDrawer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: "#1a1b1f",
    display: "flex",
    height: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    top: 0,
  },
  head: {
    paddingTop: 10,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "93%",
    height: "100%",
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#1a1b1f",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  input: {
    height: "20%",
    width: "80%",
    paddingLeft: 10,
  },
});
