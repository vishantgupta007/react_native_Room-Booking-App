import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import listingData from "../../assets/data/listingData/airbnb-listings.json";
import { Colors } from "../../constants/Colors";
import Animated, {
  SlideInDown,
  SlideInUp,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "../../constants/Styles";

const Page = () => {
  const result = useGlobalSearchParams();
  const id = result.id;

  const listing = listingData.find((list) => list.id === id);
  console.log(listing.name);
  const IMG_HEIGHT = 400;
  const { width } = Dimensions.get("screen");

  const scrollRef = useAnimatedRef();

  // For setting the parallelex effect on image

  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  // For sharing it with anyone

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.title,
        url: listing.listing_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // for showing the headerBg if we scroll and it touches the header then headerBg will appear

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  // For showing the buttons on both side on the top

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // for headerBg

      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),

      //  Here is the end

      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={Colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={Colors.dark} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    // For whole container

    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
      >
        <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[{ height: IMG_HEIGHT, width: width }, imageAnimatedStyle]}
          resizeMode="cover"
          entering={SlideInUp.delay(300)}
        />

        {/* For Room Description */}

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Ionicons name="star" size={16} color="goldenrod" />
            <Text style={styles.ratings}>
              {listing.review_scores_rating !== 0
                ? listing.review_scores_rating / 20
                : 3}
              &nbsp; | &nbsp;
              {listing.number_of_reviews !== 0 && null
                ? listing.number_of_review
                : 10}
              reviews
            </Text>
          </View>
          <View style={styles.divider} />

          {/* For host image and name */}

          <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          {/* For the border on top and bottom */}

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

      {/* For animated footer */}

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>${listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    // color: Colors.skyBlue,
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
    color: Colors.skyBlue,
    opacity: 0.55,
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 10,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
    lineHeight: 22,
  },
});
