import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background,
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2
    },
    usuario: {
        color: COLORS.text,
        fontWeight: "bold",
        fontSize: 18
    },
    detalle: {
        marginTop: 4,
        fontSize: 14
    },
    fecha: {
        marginTop: 6,
        fontSize: 12,
        color: COLORS.textLight
    },
    titleText: {
        padding: 20,
        color: COLORS.text,
        fontSize: 24,
        fontWeight: "bold",
    },
    seeMoreButton: {
        marginTop: 10,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: 8,
    },
    seeMoreButtonText: {
        color: COLORS.white,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
    }
})