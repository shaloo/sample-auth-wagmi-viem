import { AuthProvider } from "@arcana/auth";

let auth: AuthProvider | null;

const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      "xar_test_b2dde12aad64eb35d72b2c80926338e178b1fa3f",
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
