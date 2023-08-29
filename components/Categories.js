import {
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StatusBar,
} from "react-native";

import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";
import Select_categories from "./categories/Select_categories";
import Add_categories from "./categories/Add_categories";
import Add_rss from "./categories/Add_rss";

export default function Categories({ Push_Option, feedId, setfeedId,options }) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Selectcategory"
        options={{ headerShown: false }}
        component={Select_categories}
        initialParams={{ feedId: feedId, setfeedId: setfeedId }}
      />
      <Stack.Screen
        name="Addrss"
        options={{ headerShown: false }}
        component={Add_rss}
      />
      <Stack.Screen
        name="Addcategory"
        options={{ headerShown: false }}
        component={Add_categories}
        initialParams={{ Push_Option: Push_Option ,options:options}}
      />
    </Stack.Navigator>
  );
}
