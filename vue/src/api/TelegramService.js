import http from "./HttpCommon";

class UserDataService {
  async checkSubscription(userData) {
    const response = await http.post("/check-subscription", { userData });
    return response.data.subscribed;
  }

  async getProgress(userId) {
    const response = await http.get("/get-progress/" + userId);
    return response.data.level;
  }

  async saveProgress(userData, level) {
    const response = await http.post("/save-progress", { userData, level });
    return response.data.success;
  }
}

export default new UserDataService();