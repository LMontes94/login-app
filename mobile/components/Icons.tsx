import { FontAwesome,Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export const HomeIcon = (props) =>(
    <FontAwesome name="home" size={32} color={COLORS} {...props}/>
);

export const ActividadIcon = (props) =>(
    <FontAwesome name="history" size={32} color={COLORS} {...props} />
);

export const PrestamoIcon = (props) =>(
    <FontAwesome name="handshake-o" size={24} color={COLORS} {...props} />
);

export const PlusIcon = (props) =>(
    <FontAwesome name="plus-circle" size={24} color={COLORS} {...props} />
);

export const ListIcon = (props) =>(
    <FontAwesome name="list-ul" size={24} color={COLORS} {...props} />
);

export const BackIcon = (props) =>(
    <Ionicons name="return-up-back" size={24} color={COLORS} {...props} />
);

export const BellIcon = (props) => (
    <FontAwesome name="bell-o" size={24} color={COLORS} {...props}  />
);

export const MenuIcon = (props) => (
    <Ionicons name="menu" size={24} color={COLORS} {...props} />
);

export const CameraIcon = (props) => (
    <FontAwesome name="camera" size={24} color={COLORS} {...props} />
);