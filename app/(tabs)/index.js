import { SafeAreaView, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "../../components/ExploreHeader";
import Listing from "../../components/Listing";
import listingData from "../../assets/data/listingData/airbnb-listings.json";
import { Colors } from "../../constants/Colors";


const Page = () => {
  const [category, setCategory] = useState("Tine Homes");

  const items = useMemo(() => listingData, []);

  const onDataChanged = (category) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 130, backgroundColor: Colors.white }}>
      <Stack.Screen
        options={{ header: () => <ExploreHeader onCategory={onDataChanged} /> }}
      />
      <Listing category={category} listings={items} />
    </View>
  );
};

export default Page;
