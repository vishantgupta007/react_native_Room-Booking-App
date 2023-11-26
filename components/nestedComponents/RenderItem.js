// For rendering the images and description of the explore page

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

const RenderItem = ({ listRef, loading, items }) => {
  return (
    <View>
      <FlatList
        data={
          loading ? <ActivityIndicator color={Colors.grey} size={24} /> : items
        }
        renderItem={({ item }) => {
          return (
            <Link href={`/listing/${item.id}`} asChild>
              <TouchableOpacity>
                <Animated.View
                  style={styles.listing}
                  entering= {FadeInRight}
                  exiting={FadeInLeft}
                >
                  {item.medium_url ? (
                    <Image
                      source={{ uri: item.xl_picture_url }}
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.container}>
                      <Text style={styles.errorText}>Image not available</Text>
                    </View>
                  )}

                  <TouchableOpacity style={styles.heartIcon}>
                    <Ionicons
                      name="heart-outline"
                      size={22}
                      color="#e63946"
                      style={{ fontFamily: "mon-b" }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: Colors.lighterGrey,
                      padding: 10,
                      borderRadius: 10,
                      gap: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.roomDesc}>
                        {item.name.length > 10
                          ? item.name.substring(0, 35)
                          : item.name}
                        ...
                      </Text>
                      <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons name="star" size={16} color="goldenrod" />
                        <Text style={{ fontFamily: "mon-b" }}>
                          (
                          {item.review_scores_rating / 20 === 0
                            ? 3
                            : item.review_scores_rating / 20}
                          )
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.roomType}>{item.room_type}</Text>
                    <View style={{ flexDirection: "row", gap: 2 }}>
                      <Text style={{ fontFamily: "mon-b" }}>
                        $ {item.price}
                      </Text>
                      <Text style={{ fontFamily: "mon" }}>/ night</Text>
                    </View>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </Link>
          );
        }}
        ref={listRef}
      />
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    marginHorizontal: "auto",
    gap: 10,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    backgroundColor: Colors.lighterGrey,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  errorText: {
    textAlignVertical: "center",
  },
  roomDesc: {
    fontSize: 16,
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },

  roomType: {
    fontFamily: "mon-sb",
    color: Colors.grey,
    letterSpacing: 1,
  },
  heartIcon: {
    position: "absolute",
    right: 30,
    top: 30,
    zIndex: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
});
