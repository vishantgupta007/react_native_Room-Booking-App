import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  // ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { countries } from "../../assets/data/places/countries";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { icons } from "../../assets/data/iconData";

const randomPerson = require("../../assets/data/images/destination/person.jpg");
const flight = require("../../assets/data/images/destination/flight.jpg");

const Page = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Stack.Screen options={{ headerTitle: "", headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.userInfo}>Hi, Vishant!</Text>
          <Text
            style={{
              fontFamily: "mon-sb",
              color: "#8ecae6",
              fontSize: 18,
            }}
          >
            Agra, UP
          </Text>
        </View>
        <View style={styles.login}>
          <MaterialCommunityIcons
            name="bell"
            size={26}
            color={Colors.lighterGrey}
          />
          <Text style={styles.dot}></Text>
          <Image source={randomPerson} style={styles.randomPerson} />
        </View>
      </View>

      <Animated.View
        style={{
          padding: 16,
          marginHorizontal: "auto",
          gap: 10,
          marginVertical: 10,
        }}
        entering={FadeInRight}
        exiting={FadeInLeft}
      >
        <Image
          source={flight}
          style={{
            width: "100%",
            height: 250,
            borderRadius: 10,
            backgroundColor: Colors.lighterGrey,
            objectFit: "contain",
          }}
        />
      </Animated.View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
          data={icons}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <MaterialIcons
                  name={item.icon}
                  size={30}
                  color="#219ebc"
                  style={styles.icons}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontFamily: "mon",
                    color: Colors.grey,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.imageCon}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "mon-sb",
            marginBottom: 20,
            paddingHorizontal: 20,
            color: Colors.grey,
          }}
        >
          Popular Trips
        </Text>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
          }}
          entering={FadeInDown}
          data={countries}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity key={item.id} style={styles.imageBox}>
                <Image
                  source={item.img}
                  style={{
                    width: 180,
                    height: 150,
                    objectFit: "fill",
                    borderRadius: 15,
                    marginHorizontal: 10,
                    backgroundColor: Colors.lighterGrey,
                  }}
                />
                <View
                  style={{
                    marginHorizontal: 10,
                    borderRadius: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      paddingLeft: 15,
                      fontFamily: "mon-sb",
                      marginTop: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 15,
                      marginTop: 5,
                    }}
                  >
                    <MaterialIcons name="star" size={18} color="goldenrod" />
                    <MaterialIcons name="star" size={18} color="goldenrod" />
                    <MaterialIcons name="star" size={18} color="goldenrod" />
                    <MaterialIcons name="star" size={18} color="goldenrod" />
                    <MaterialIcons name="star" size={18} color="goldenrod" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    fontFamily: "mon-sb",
    fontSize: 22,
    marginBottom: 10,
    color: Colors.grey,
  },
  login: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    position: "relative",
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: Colors.skyBlue,
    borderRadius: 25,
    position: "absolute",
    right: 55,
    top: 5,
  },
  icons: {
    backgroundColor: "#caf0f8",
    borderRadius: 30,
    padding: 15,
  },

  randomPerson: {
    height: 30,
    width: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.grey,
    objectFit: "contain",
  },
  imageCon: {
    marginVertical: 30,
    // backgroundColor: Colors.lightGrey
  },

  imageBox: {},
});
