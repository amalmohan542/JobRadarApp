import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES, icons, images } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { jobDetailsData, jobSearchData } from "../../constants/dummyData";
import { RefreshControl } from "react-native";

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const tabs = ["About", "Qualifications", "Responsibilities"];
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  //TODO:Uncomment to get real time data from api instead of dummy data
//   const { data, error, isLoading ,refetch} = useFetch("job-details", {
//     job_id: params?.id,
//   });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  const isLoading = false;
  const error = false;
  const data = jobDetailsData;

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided."} />
        );

        break;
      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong.</Text>
          ) : data?.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
              <JobFooter
                url={data[0].job_google_link ?? "https://careers.google.com/"}
              />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
