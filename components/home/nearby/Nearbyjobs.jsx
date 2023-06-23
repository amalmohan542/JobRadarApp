import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { jobSearchData } from "../../../constants/dummyData";

const Nearbyjobs = () => {
  const router = useRouter();
  //TODO:Uncomment to get real time data from api instead of dummy data
  //   const { data, isLoading, refetch, error } = useFetch("search", {
  //     query: "Rect developer",
  //     num_pages: 1,
  //   });

  const isLoading = false;
  const error = false;
  const data = jobSearchData;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
