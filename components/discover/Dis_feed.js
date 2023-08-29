import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import TopicList from "./TopicList";

export default function Dis_feed({
  setFeedName,
  topic_data,
  setTopic_data,
  feedId,
  setfeedId,
}) {
  return (
    <View style={styles.contain}>
      {topic_data.length === 0 ? (
        <View style={[styles.flex, styles.loading]}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <ScrollView>
          {topic_data.map((item, idx) => (
            <View key={idx}>
              <TopicList
                setFeedName={setFeedName}
                list={item}
                feedId={feedId}
                setfeedId={setfeedId}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    height: "100%",
    borderRadius: 10,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    height: "100%",
    backgroundColor: "#1a1b1f",
  },
});