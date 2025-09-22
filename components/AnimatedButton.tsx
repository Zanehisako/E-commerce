import { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface props {
  text: string,
  onPress: () => void
  style?: ViewStyle
}
function AnimatedButton({ text, onPress, style }: props) {
  const scale = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: (scale.value) }]
    }
  }
  )
  return (
    <Animated.View style={[style, styles.buttonContainer, animatedStyle]}>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPressIn={() => {
          scale.value = withSpring(0.8)
        }}
        onPressOut={() => {
          scale.value = withSpring(1)
          onPress()
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
export default memo(AnimatedButton)

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 60,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center"
  }
})
