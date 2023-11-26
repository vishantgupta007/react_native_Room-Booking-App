import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { reviews } from "../../assets/data/customerReviews";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

const Reviews = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: "mon-b",
            paddingHorizontal: 20,
            color: Colors.skyBlue,
            fontSize: 26,
            paddingVertical: 10,
          }}
        >
          What our Customers say!
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        data={reviews}
        renderItem={({ item }) => {
          return (
            <Animated.View
              style={styles.reviewContainer}
              entering={FadeInRight}
              exiting={FadeInLeft}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.img}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: 25,
                  }}
                />
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <FontAwesome name="star" size={16} color="goldenrod" />
                  <Text>({item.rating})</Text>
                </View>
              </View>
              <Text style={{ fontFamily: "mon", lineHeight: 22 }}>
                {item.reviewText}
              </Text>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  color: "#e76f51",
                  letterSpacing: 1.1,
                }}
              >
                {item.userName}
              </Text>
              <Text style={{ fontFamily: "mon" }}>{item.date}</Text>
            </Animated.View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          // Render a component to provide space at the end
          <View style={{ marginVertical: 10 }} />
        )}
      />

      <Stack.Screen options={{ headerTitle: "", headerShown: false }} />
    </SafeAreaView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    fontFamily: "mon-b",
    paddingTop: Platform.OS === "android" ? 50 : null,
  },

  reviewContainer: {
    paddingTop: 20,
    backgroundColor: Colors.lighterGrey,
    margin: 5,
    padding: 10,
    borderRadius: 12,
    gap: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
});
