import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import ArticleList from "./feed/ArticleList";

export default function Feed({
  content,
  setContent,
  setNewsPerPage,
  newsPerPage,
  loadMoreFeedId,
  setdata,
  setlink,
  settitle,
  click_fetch,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [select_category, setselect_category] = useState(false);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const fetchMoreNews = async () => {
    // Increment the number of news items to fetch
    setNewsPerPage((prevNewsPerPage) => prevNewsPerPage + 10);
    try {
      const newsCount = newsPerPage + 10;
      const feedUrls = loadMoreFeedId.map(
        (feedUrl) =>
          `https://api.feedly.com/v3/streams/contents?streamId=${feedUrl}&count=${newsCount}&ranked=newest&locale=en`
      );
      const response = await Promise.all(
        feedUrls.map((url) => fetch(url, requestOptions))
      );
      const articleData = await Promise.all(
        response.map((response) => response.json())
      );
      const articles = [];
      articleData.forEach((data) => {
        articles.push(...data.items);
      });
      const uniqueTitles = new Set(content.map((item) => item.title));
      const uniqueData = articles.filter(
        (item) => !uniqueTitles.has(item.title)
      );

      // Add unique data to the existing content
      setContent([
        ...content,
        ...uniqueData.sort(
          (a, b) => new Date(b.published) - new Date(a.published)
        ),
      ]);
      // setContent([...content, ...uniqueData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (click_fetch) {
      setIsLoading(content.length === 0);
      setselect_category(false);
    } else {
      setIsLoading(false);
      setselect_category(true);
    }
  }, [content, click_fetch]);

  return (
    <>
      {select_category && (
        <View
          style={[
            styles.contain,
            { height: Dimensions.get("window").height - 204 },
          ]}
        >
          <View style={[styles.flex, { justifyContent: "center" }]}>
            <Image
              source={require("../assets/cat.png")}
              style={{
                height: "50%",
                aspectRatio: 1 / 1,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                color: "#e5e5e5",
                fontSize: 26,
                fontWeight: "500",
              }}
            >
              Create or select a category.
            </Text>
          </View>
        </View>
      )}
      {isLoading ? (
        <View
          style={[
            styles.contain,
            { height: Dimensions.get("window").height - 204 },
          ]}
        >
          <View style={[styles.flex, { justifyContent: "center" }]}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </View>
      ) : (
        <ScrollView style={styles.contain}>
          {content.map((item, idx) => (
            <View key={idx}>
              <ArticleList
                list={item}
                setdata={setdata}
                setlink={setlink}
                settitle={settitle}
              />
            </View>
          ))}
          {click_fetch && (
            <View style={styles.loadMoreContainer}>
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={fetchMoreNews}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    width: "100%",
    backgroundColor: "#1a1b1f",
  },
  flex: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  loadMoreContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadMoreButton: {
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
