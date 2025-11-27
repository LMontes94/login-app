import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { saveToken } from "@/services/auth"; // tu helper para guardar el token

export default function SignUpScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    try {
      const response = await fetch("http://TU-IP:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email: emailAddress,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Hubo un error");
        return;
      }

      await saveToken(data.token);
      router.replace("/");
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/android-icon-foreground.png")}
          style={styles.illustration}
        />

        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#9A8478"
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#9A8478"
          onChangeText={setApellido}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="#9A8478"
          onChangeText={setEmailAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9A8478"
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>

          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
