import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "./components/Categories";
import Home from "./components/Home";
import Webview from "./components/Webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [data, setdata] = useState();
  const [link, setlink] = useState();
  const [title, settitle] = useState();
  const [feedId, setFeedId] = useState();

  const [options, setoptions] = useState([]);
  const Push_Option = async (categoriesName, FeedName, feedId,feedimg) => {
    if (categoriesName.trim() !== "") {
      const existingCategory = options.find(
        (category) => category.name === categoriesName
      );
      if (existingCategory) {
        const updatedCategories = options.map((category) => {
          if (category.name === existingCategory.name) {
            return {
              ...category,
              feed_name: [...category.feed_name, FeedName],
              feed_id: [...category.feed_id, feedId],
              feedimg: [...category.feedimg, feedimg],
            };
          } else {
            return category;
          }
        });
        setoptions(updatedCategories);
        await AsyncStorage.setItem(
          "options",
          JSON.stringify(updatedCategories)
        );
      } else {
        const newCategory = {
          name: categoriesName,
          feed_name: [FeedName],
          feed_id: [feedId],
          feedimg: [feedimg],
        };
        setoptions([...options, newCategory]);
        await AsyncStorage.setItem(
          "options",
          JSON.stringify([...options, newCategory])
        );
      }
    }
  };

  useEffect(() => {
    // Load options array from AsyncStorage
    AsyncStorage.getItem("options").then((storedOptions) => {
      if (storedOptions) {
        setoptions(JSON.parse(storedOptions));
      }
    });
  }, []);

  const HomeScreen = () => (
    <Home
      setoptions={setoptions}
      setFeedId={setFeedId}
      options={options}
      setdata={setdata}
      setlink={setlink}
      settitle={settitle}
      data={data}
      title={title}
    />
  );

  const CategoriesScreen = () => (
    <Categories
      Push_Option={Push_Option}
      options={options}
      setoptions={setoptions}
      feedId={feedId}
      setfeedId={setFeedId}
    />
  );

  const WebviewScreen = () => (
    <Webview/>
  );

  return (
    <View style={styles.contain}>
      <StatusBar backgroundColor={"#1a1b1f"} />
      <NavigationContainer
        screenOptions={{
          headerShown: false,
          backgroundColor: "#1a1b1f",
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Categories"
            options={{ headerShown: false }}
            component={CategoriesScreen}
          />
          <Stack.Screen
            name="Webview"
            options={{ headerShown: false }}
            component={WebviewScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    flex: 1,
    backgroundColor: "#1a1b1f",
  },
});
