import { api } from "../../utils";
import { LOGIN, SIGNUP } from "../ApisConstants";

class AuthApi {
  static sharedInstance = new AuthApi();

  constructor() {
    if (AuthApi.sharedInstance !== null) {
      return AuthApi.sharedInstance;
    }
  }

  //   Signup
  async signUp(body) {
    try {
      const response = await api.post(SIGNUP, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  // Login
  async signIn(body) {
    try {
      const response = await api.post(LOGIN, body);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default AuthApi.sharedInstance;
