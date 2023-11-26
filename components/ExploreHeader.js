import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { categories } from "../assets/data/iconData";

const ExploreHeader = ({ onCategory }) => {
  const [activeItem, SetActiveItem] = useState(0);

  const iconRef = useRef(null);

  const selectCategory = (index) => {
    SetActiveItem(index);
    onCategory(categories[index].name);
  };

  return (
    <SafeAreaView style={styles.platform}>
      <View style={styles.container}>
        {/* for upper Row  */}

        <View style={styles.actionRow}>
          <Link href={"/(modals)/book"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-b" }}>Where To?</Text>
                <Text style={{ fontFamily: "mon", color: Colors.lightGrey }}>
                  Anywhere | Anyweek | Anytime
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity>
            <Ionicons
              name="options-outline"
              size={24}
              style={styles.filterBtn}
            />
          </TouchableOpacity>
        </View>

        {/* For Lower Row */}

        <View>
          <FlatList
            horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 25,
              paddingHorizontal: 20,
              marginTop: 30,
            }}
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectCategory(index);
                  }}
                  key={item.id}
                  style={
                    activeItem === index
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn
                  }
                >
                  <MaterialIcons
                    name={item.icon}
                    size={35}
                    color={activeItem === index ? Colors.skyBlue : Colors.grey}
                  />
                  <Text
                    style={
                      activeItem === index
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ref={iconRef}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  platform: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 50,
    width: "100%",
  },

  container: {
    height: 180,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGrey,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    gap: 10,
  },
  filterBtn: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 10,
    marginTop: 7,
  },
  searchBtn: {
    flexDirection: "row",
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: "space-around",
    padding: 14,
    alignItems: "center",
    gap: 10,
    borderRadius: 30,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,

    elevation: 20,
    shadowColor: Colors.dark,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  // For Text after clicking

  categoryText: {
    fontFamily: "mon-sb",
    fontSize: 13,
    color: Colors.dark,
  },
  categoryTextActive: {
    fontFamily: "mon-sb",
    fontSize: 13,
    color: Colors.lightGrey,
  },

  // For border-bottom after clicking

  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Colors.dark,
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});
