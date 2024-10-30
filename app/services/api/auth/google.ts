export const googleAuth = {
  getUserInfoGoogle: async (token: string) => {
    if (!token) return;
    try {
      const userInfo = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await userInfo.json();
      console.log("🎸 getUserInfo", user);
      return user;
    } catch (error) {
      console.error(
        "Failed to fetch user data from Google API"
      );
    }
  },
}
