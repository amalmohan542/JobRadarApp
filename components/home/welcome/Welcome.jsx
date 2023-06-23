import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES, icons } from "../../../constants";

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState("Full-time");
  const jobTypes = ["Full-time", "Part-time", "Contract"];
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello, Amal</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchTerm}
            placeholder='What are you looking for?'
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
              style={styles.tab(activeJobType, item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        ></FlatList>
      </View>
    </View>
  );
};

export default Welcome;
