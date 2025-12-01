import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export const HomeIcon = (props) =>(
    <FontAwesome name="home" size={32} color={COLORS} {...props}/>
);