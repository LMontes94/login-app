import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export default function useScanLineAnimation(maxHeight = 200, duration = 2000) {
    const moveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(moveAnim, {
                    toValue: 1,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(moveAnim, {
                    toValue: 0,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [moveAnim, duration]);

    const translateY = moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, maxHeight],
    });

    return translateY;
}
