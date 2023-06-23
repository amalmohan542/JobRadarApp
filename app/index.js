import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { icons, images } from "../constants";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
