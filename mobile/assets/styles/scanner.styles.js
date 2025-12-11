import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    overlayContainer: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },

    overlayTop: {
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.background,
    },

    middleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    overlaySide: {
        width: "20%",
        height: 250,
        backgroundColor: COLORS.background,
    },

    frame: {
        width: 250,
        height: 250,
        borderWidth: 3,
        borderColor: COLORS.income,
        borderRadius: 12,
    },

    overlayBottom: {
        flex: 1,
        width: "100%",
        backgroundColor: COLORS.background,
    },

    text: {
        textAlign: "center",
        padding: 10,
        fontSize: 18,
        fontWeight: "bold",
    },

    line: {
        position: "absolute",
        top: 0,
        height: 2,
        width: "100%",
        backgroundColor: COLORS.expense,
    },
});
