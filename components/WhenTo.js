import { View, Text, TouchableOpacity } from "react-native";
import { defaultStyles } from "../constants/Styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Colors } from "../constants/Colors";
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const WhenTo = ({ openCard, setOpenCard }) => {
  const today = new Date().toISOString().substring(0, 10);
  return (
    <View style={defaultStyles.card}>
      {openCard != 1 && (
        <AnimatedTouchableOpacity
          onPress={() => setOpenCard(1)}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={defaultStyles.previewText}>When</Text>
          <Text style={defaultStyles.previewData}>Any week</Text>
        </AnimatedTouchableOpacity>
      )}

      {openCard == 1 && (
        <Text style={defaultStyles.cardHeader}>When's your trip?</Text>
      )}

      {openCard == 1 && (
        <Animated.View style={defaultStyles.cardBody}>
          <DatePicker
            options={{
              defaultFont: "mon",
              headerFont: "mon-sb",
              mainColor: Colors.primary,
              borderColor: "transparent",
            }}
            current={today}
            selected={today}
            mode={"calendar"}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default WhenTo;
