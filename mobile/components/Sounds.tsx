import { Audio } from "expo-av";

export async function playBeep() {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sounds/qr-ticket-scanner-clean.mp3")
  );
  await sound.playAsync();
}

export async function playError() {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sounds/error.wav")
  );
  await sound.playAsync();
}