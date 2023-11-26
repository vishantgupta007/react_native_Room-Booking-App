import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { defaultStyles } from "../constants/Styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { places } from "../assets/data/places/maps";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const WhereTo = ({
  setSelectedPlace,
  openCard,
  setOpenCard,
  selectedPlace,
}) => {
  return (
    <Animated.View style={defaultStyles.card}>
      {openCard != 0 && (
        <AnimatedTouchableOpacity
          onPress={() => setOpenCard(0)}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <AnimatedText style={defaultStyles.previewText}>Where</AnimatedText>
          <AnimatedText style={defaultStyles.previewData}>
            I'm flexible
          </AnimatedText>
        </AnimatedTouchableOpacity>
      )}

      {openCard == 0 && (
        <AnimatedText style={defaultStyles.cardHeader}>Where to?</AnimatedText>
      )}
      {openCard == 0 && (
        <AnimatedView
          entering={FadeIn}
          exiting={FadeOut}
          style={defaultStyles.cardBody}
        >
          <View style={defaultStyles.searchSection}>
            <Ionicons
              style={defaultStyles.searchIcon}
              name="ios-search"
              size={20}
              color="#000"
            />
            <TextInput
              style={defaultStyles.inputField}
              placeholder="Search destinations"
              placeholderTextColor={Colors.grey}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={defaultStyles.placesContainer}
          >
            {places.map((place, index) => {
              const { id, img, title } = place;

              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => setSelectedPlace(index)}
                >
                  <Image
                    source={img}
                    style={
                      selectedPlace === index
                        ? defaultStyles.placeSelected
                        : defaultStyles.place
                    }
                  />
                  <Text
                    style={{
                      fontFamily: "mon-sb",
                      paddingTop: 6,
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </AnimatedView>
      )}
    </Animated.View>
  );
};

export default WhereTo;
