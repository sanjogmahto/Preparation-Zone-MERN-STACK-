const TOKEN_KEY = "prepzone_auth_token";
const USER_KEY = "prepzone_current_user";
export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getCurrentUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  getUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setCurrentUser: (user) =>
    localStorage.setItem(USER_KEY, JSON.stringify(user)),
};
async function fetchJson(url, options) {
  const token = authStorage.getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, {
    ...options,
    headers,
  });
  if (!res.ok) {
    let errorMsg = "An error occurred";
    try {
      const data = await res.json();
      errorMsg = data.error || data.message || errorMsg;
    } catch {
      errorMsg = `HTTP Error ${res.status}: ${res.statusText}`;
    }
    throw new Error(errorMsg);
  }
  return res.json();
}
export const api = {
  // Auth
  async login(email, password) {
    const data = await fetchJson("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    authStorage.setToken(data.token);
    authStorage.setCurrentUser(data.user);
    return data;
  },
  async register(userData) {
    const data = await fetchJson("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    authStorage.setToken(data.token);
    authStorage.setCurrentUser(data.user);
    return data;
  },
  async logout() {
    authStorage.removeToken();
  },
  async updateProfile(userId, profile) {
    const data = await fetchJson("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify({ userId, ...profile }),
    });
    authStorage.setCurrentUser(data.user);
    return data.user;
  },
  // Subjects
  async getSubjects() {
    const data = await fetchJson("/api/subjects");
    return data.subjects;
  },
  async createSubject(subject) {
    const data = await fetchJson("/api/subjects", {
      method: "POST",
      body: JSON.stringify(subject),
    });
    return data.subject;
  },
  async updateSubject(id, updates) {
    const data = await fetchJson(`/api/subjects/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return data.subject;
  },
  async deleteSubject(id) {
    await fetchJson(`/api/subjects/${id}`, { method: "DELETE" });
  },
  // Tests
  async getTests(subjectId, difficulty, search) {
    const params = new URLSearchParams();
    if (subjectId) params.set("subjectId", subjectId);
    if (difficulty) params.set("difficulty", difficulty);
    if (search) params.set("search", search);
    const qs = params.toString();
    const data = await fetchJson(`/api/tests${qs ? `?${qs}` : ""}`);
    return data.tests;
  },
  async getTestById(testId) {
    return this.getTestForExam(testId);
  },
  async getTestForExam(testId) {
    const data = await fetchJson(`/api/tests/${testId}/take`);
    return data.test;
  },
  async createTest(testData) {
    const data = await fetchJson("/api/tests", {
      method: "POST",
      body: JSON.stringify(testData),
    });
    return data.test;
  },
  async updateTest(id, updates) {
    const data = await fetchJson(`/api/tests/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return data.test;
  },
  async togglePublishTest(id) {
    const data = await fetchJson(`/api/tests/${id}/publish`, {
      method: "PATCH",
    });
    return data.test;
  },
  async deleteTest(id) {
    await fetchJson(`/api/tests/${id}`, { method: "DELETE" });
  },
  // Questions
  async addQuestion(testId, question) {
    const data = await fetchJson(`/api/questions/tests/${testId}`, {
      method: "POST",
      body: JSON.stringify(question),
    });
    return data.question;
  },
  async updateQuestion(id, updates) {
    const data = await fetchJson(`/api/questions/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return data.question;
  },
  async deleteQuestion(id) {
    await fetchJson(`/api/questions/${id}`, { method: "DELETE" });
  },
  // Submissions & Results
  async submitTest(arg1, answersArg, timeTakenSecondsArg) {
    let payload;
    if (typeof arg1 === "string") {
      const user = authStorage.getUser();
      payload = {
        testId: arg1,
        userId: user?.id || "demo-candidate",
        userName: user?.name || "Student Candidate",
        userEmail: user?.email || "student@prepzone.edu",
        answers: answersArg || [],
        timeTakenSeconds: timeTakenSecondsArg || 60,
      };
    } else {
      payload = arg1;
    }
    const data = await fetchJson("/api/results/submit", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.result;
  },
  async getUserHistory(userId) {
    const data = await fetchJson(
      `/api/results/history?userId=${encodeURIComponent(userId)}`,
    );
    return data.history;
  },
  async getUserResults(userId) {
    return this.getUserHistory(userId);
  },
  async getResultById(id) {
    const data = await fetchJson(`/api/results/${id}`);
    return data.result;
  },
  async getAllResults() {
    const data = await fetchJson("/api/results/admin/all");
    return data.results;
  },
  // Leaderboard
  async getLeaderboard() {
    const data = await fetchJson("/api/leaderboard");
    return data.leaderboard;
  },
  // Admin
  async getAdminStats() {
    const data = await fetchJson("/api/admin/stats");
    return data.stats;
  },
  async getUsers() {
    const data = await fetchJson("/api/admin/users");
    return data.users;
  },
  async updateUserRole(userId, role) {
    const data = await fetchJson(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
    return data.user;
  },
  async deleteUser(userId) {
    await fetchJson(`/api/admin/users/${userId}`, { method: "DELETE" });
  },
};
