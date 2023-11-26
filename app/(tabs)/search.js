import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Stack } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { countries } from "../../assets/data/places/countries";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

const Search = () => {
  // const AnimatedTouchableOpacity =
  //   Animated.createAnimatedComponent(TouchableOpacity);

  const searches = [
    {
      id: 1,
      place: "Speciality Lodgings",
    },
    {
      id: 2,
      place: "Hotels",
    },
    {
      id: 3,
      place: "Hostels",
    },
    {
      id: 4,
      place: "B&B & Inns",
    },
    {
      id: 5,
      place: "Motels",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.text}>Search</Text>
              <Feather name="map" size={28} color="black" style={styles.icon} />
            </View>
            <View style={styles.searchBar}>
              <Ionicons
                name="search-outline"
                size={24}
                color={Colors.lightGrey}
              />
              <Text style={styles.inputText}>Where To?</Text>
            </View>
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 22,
                color: Colors.grey,
                paddingLeft: 25,
              }}
            >
              Recent
            </Text>
            <View style={styles.itemsPlace}>
              {searches.map((search) => {
                const { id, place } = search;
                return (
                  <Animated.View
                    key={id}
                    style={styles.placeContainer}
                    entering={FadeInRight}
                    exiting={FadeInLeft}
                  >
                    <Text style={styles.placeGuide}>{place}</Text>
                  </Animated.View>
                );
              })}
            </View>

            <Text
              style={{
                marginVertical: 20,
                fontFamily: "mon-sb",
                fontSize: 26,
                paddingHorizontal: 25,
              }}
            >
              Traveler Love
            </Text>

            <Animated.View
              style={{
                flex: 1,
                marginBottom: 30,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                marginHorizontal: 2,
              }}
              entering={FadeInRight}
              exiting={FadeInLeft}
            >
              {countries.map((country) => {
                return (
                  // <Link href={`countriesList/${country.id}`} asChild>
                  <TouchableOpacity
                    key={country.id}
                    style={{ position: "relative" }}
                  >
                    <Image source={country.img} style={styles.counImg} />
                    <Text style={styles.counName}>{country.title}</Text>
                  </TouchableOpacity>
                  // </Link>
                );
              })}
            </Animated.View>
          </>
        }
      />

      <Stack.Screen options={{ headerTitle: "", headerShown: false }} />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 50 : null,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontFamily: "mon-b",
    letterSpacing: 1.1,
  },
  searchBar: {
    marginVertical: 30,
    marginHorizontal: 30,
    flexDirection: "row",
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "flex-start",
    gap: 14,
    padding: 14,
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#f9f7f3",
    borderColor: Colors.lightGrey,

    elevation: 20,
    shadowColor: Colors.grey,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  inputText: {
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  itemsPlace: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  placeGuide: {
    fontFamily: "mon-sb",
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: Colors.lighterGrey,
    marginVertical: 10,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    letterSpacing: 1.5,
    borderColor: Colors.lighterGrey,
    color: Colors.grey,
  },
  counImg: {
    width: 180,
    height: 150,
    objectFit: "cover",
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  counName: {
    position: "absolute",
    fontFamily: "mon",
    zIndex: 100,
    bottom: "10%",
    left: "10%",
    color: Colors.white,
    fontSize: 22,
    fontFamily: "mon-sb",
  },
});
