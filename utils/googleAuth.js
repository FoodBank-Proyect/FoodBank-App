import { useCallback, useEffect } from "react";
import { useIdTokenAuthRequest as useGoogleIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { auth, expoClientId, iosClientId } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { View } from "react-native";
import { Icon } from "@rneui/themed";

export default function GoogleAuth() {
  const [, googleResponse, promptAsyncGoogle] = useGoogleIdTokenAuthRequest({
    selectAccount: true,
    expoClientId: expoClientId,
    iosClientId: iosClientId,
  });

  // Function that triggers the Google OAuth flow
  const handleLoginGoogle = async () => {
    await promptAsyncGoogle();
  };

  // Function that logs into firebase using the credentials from an OAuth provider
  const loginToFirebase = useCallback(async (credentials) => {
    const signInResponse = await signInWithCredential(auth, credentials);
  }, []);

  // When the user successfully logs in with Google, authenticate with Firebase
  useEffect(() => {
    if (googleResponse?.type === "success") {
      const credentials = GoogleAuthProvider.credential(
        googleResponse.params.id_token
      );
      loginToFirebase(credentials);
    }
  }, [googleResponse]);

  return (
    <Icon
      name="google"
      type="font-awesome"
      color="#db3236"
      size={45}
      onPress={handleLoginGoogle}
      style={{
        borderRadius: "50%",
        padding: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#db3236",
      }}
    />
  );
}
