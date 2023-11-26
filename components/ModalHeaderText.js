import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={[
            styles.text,
            { textDecorationLine: active === 0 ? "underline" : "none" },
            { color: active === 0 ? Colors.dark : Colors.grey },
          ]}
        >
          Stays
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[
            styles.text,
            { textDecorationLine: active === 1 ? "underline" : "none" },
            { color: active === 1 ? Colors.dark : Colors.grey },
          ]}
        >
          Experience
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeaderText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  text: {
    fontFamily: "mon-sb",
    fontSize: 18,
  },
});
