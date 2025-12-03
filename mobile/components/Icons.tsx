import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export const HomeIcon = (props) =>(
    <FontAwesome name="home" size={32} color={COLORS} {...props}/>
);

export const ActividadIcon = (props) =>(
    <FontAwesome name="history" size={32} color={COLORS} {...props} />
);