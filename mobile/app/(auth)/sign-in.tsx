import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAuth } from "../../context/AuthContext";
import { styles } from "../../assets/styles/auth.styles";
import { COLORS } from "@/constants/colors";

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    setError("");

    if (!emailAddress || !password) {
      setError("Completá todos los campos.");
      return;
    }

    const res = await login(emailAddress, password);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    // login correcto
    router.replace("/");
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableAutomaticScroll
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={styles.illustration}
        />

        <Text style={styles.title}>Bienvenido</Text>

        {/* Error box */}
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Email */}
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email"
          placeholderTextColor="#9A8478"
          onChangeText={(email) => setEmailAddress(email)}
        />

        {/* Password */}
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Contraseña"
          placeholderTextColor="#9A8478"
          secureTextEntry
          onChangeText={(pass) => setPassword(pass)}
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        {/* Link a Sign Up */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>¿No tenés cuenta?</Text>

          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text style={styles.linkText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
