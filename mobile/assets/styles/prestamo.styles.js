import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
    },
    titleText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        backgroundColor: COLORS.background,
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    cardText: {
        color: COLORS.text,
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight: "bold",
    },
    icon: {
        color: COLORS.primary,
        marginHorizontal: 25,
    },
    sinActividadContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    sinActividadText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: COLORS.text,
    },
    prestatarioText: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.text,
    },
    equipoText: {
        fontSize: 16,
        fontWeight: "400",
        color: COLORS.text,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    backButton: {
        marginTop: 5,
        backgroundColor: COLORS.primary,
        padding: 20,
        marginBottom: 12,
        borderRadius: 10,
        elevation: 2,
    },
    backButtonText: {
        color: COLORS.white,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
    },
    inputPrestamo: {
        borderWidth: 2,
        padding: 8,
        marginTop: 8
    },
    containerButtons: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    returnButton: {
        backgroundColor: COLORS.primary,
        padding: 20,
        marginTop: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    returnButtonText: {
        color: COLORS.white,
        fontWeight: "600",
    },
    cardActivos: {
        backgroundColor: COLORS.white,
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardInfo:{
        flex:1,
    }
});