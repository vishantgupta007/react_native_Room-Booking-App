import { View, Text, TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { guestsGroups } from "../assets/data/GuestList";
import { Colors } from "../constants/Colors";
import { useState } from "react";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const WhoseTo = ({ openCard, setOpenCard }) => {
  const [guestList, setGuestList] = useState(guestsGroups);

  const increaseHandleCount = (index) => {
    const newGroups = [...guestList];
    newGroups[index].count++;
    setGuestList(newGroups);
  };
  const decHandlerCounter = (index) => {
    const newGroups = [...guestList];
    newGroups[index].count =
      newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;
    setGuestList(newGroups);
  };

  return (
    <View style={defaultStyles.card}>
      {openCard != 2 && (
        <AnimatedTouchableOpacity
          onPress={() => setOpenCard(2)}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={defaultStyles.previewText}>Who</Text>
          <Text style={defaultStyles.previewData}>Add guests</Text>
        </AnimatedTouchableOpacity>
      )}

      {openCard == 2 && (
        <Text style={defaultStyles.cardHeader}>Who's coming?</Text>
      )}

      {openCard == 2 && (
        <Animated.View style={defaultStyles.cardBody}>
          {guestsGroups.map((guest, index) => {
            return (
              <View
                key={guest.id}
                style={[
                  defaultStyles.guestItem,
                  index + 1 < guestsGroups.length
                    ? defaultStyles.itemBorder
                    : null,
                ]}
              >
                <View>
                  <Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
                    {guest.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "mon",
                      fontSize: 14,
                      color: Colors.grey,
                    }}
                  >
                    {guest.text}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => decHandlerCounter(index)}>
                    <Ionicons
                      name="remove-circle-outline"
                      size={26}
                      color={guest.count > 0 ? Colors.grey : "#cdcdcd"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "mon",
                      fontSize: 16,
                      minWidth: 18,
                      textAlign: "center",
                    }}
                  >
                    {guest.count}
                  </Text>
                  <TouchableOpacity onPress={() => increaseHandleCount(index)}>
                    <Ionicons
                      name="add-circle-outline"
                      size={26}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </Animated.View>
      )}
    </View>
  );
};
