import { AuthProvider } from "@arcana/auth";

let auth: AuthProvider | null;

const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      //"xar_test_b2dde12aad64eb35d72b2c80926338e178b1fa3f",
      "xar_live_d7c88d9b033d100e4200d21a5c4897b896e60063",
      {
        theme: "light",
        connectOptions: {
          compact: true
        }
      }
    );
  }
  return auth;
};

export { getAuthProvider };
