import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "../../constants/Styles";
import WhereTo from "../../components/WhereTo";
import { WhoseTo } from "../../components/WhoseTo";
import WhenTo from "../../components/WhenTo";

const Book = () => {
  const router = useRouter();

  const [openCard, setOpenCard] = useState(0);

  const [selectedPlace, setSelectedPlace] = useState(0);

  const onClearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
  };

  return (
    <View style={styles.container}>
      <WhereTo
        openCard={openCard}
        selectedPlace={selectedPlace}
        setOpenCard={setOpenCard}
        setSelectedPlace={setSelectedPlace}
      />
      <WhenTo
        openCard={openCard}
        selectedPlace={selectedPlace}
        setOpenCard={setOpenCard}
      />

      <WhoseTo openCard={openCard} setOpenCard={setOpenCard} />

      {/* Footer */}

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={defaultStyles.headTitle}>
          <TouchableOpacity
            style={{ height: "100%", justifyContent: "center" }}
            onPress={onClearAll}
          >
            <Text style={defaultStyles.clearAll}>Clear all</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <Ionicons
              name="search-outline"
              size={24}
              style={defaultStyles.btnIcon}
              color={"#fff"}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#fff",
  },
});
