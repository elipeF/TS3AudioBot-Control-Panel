import instance from "./../../axios";

class JwtAuthService {
  loginWithUsernameAndPassword = (username, password) => {
    return instance
      .post(`http://${window.location.hostname}:8081/auth/login`, {
        name: username,
        password,
      })
      .then(({ data }) => {
        this.setSession(data.access_token);
        return instance.get(
          `http://${window.location.hostname}:8081/users/profile`
        );
      })
      .then(({ data }) => {
        this.setUser({
          userId: data.id,
          displayName: data.name,
          role: data.admin ? "admin" : "user",
        });
        this.setSession(window.localStorage.getItem("jwt_token"));
        return {
          userId: data.id,
          displayName: data.name,
          role: data.admin ? "admin" : "user",
        };
      });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = () => {
    if (window.localStorage.getItem("jwt_token")) {
      return instance
        .get(`http://${window.location.hostname}:8081/users/profile`)
        .then(({ data }) => {
          this.setUser({
            userId: data.id,
            displayName: data.name,
            role: data.admin ? "admin" : "user",
          });
          this.setSession(window.localStorage.getItem("jwt_token"));
          return {
            userId: data.id,
            displayName: data.name,
            role: data.admin ? "admin" : "user",
          };
        });
    }
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
  };

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token) => {
    if (token) {
      window.localStorage.setItem("jwt_token", token);
    } else {
      window.localStorage.removeItem("jwt_token");
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    window.localStorage.setItem("auth_user", JSON.stringify(user));
  };
  // Remove user from localstorage
  removeUser = () => {
    window.localStorage.removeItem("auth_user");
  };
}

export default new JwtAuthService();
