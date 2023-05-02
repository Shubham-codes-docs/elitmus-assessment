import { create } from "zustand";

export const useUserData = create((set, get) => ({
  token: localStorage.getItem("token") || "",
  setToken: (newToken) => {
    set({ token: newToken });
    localStorage.setItem("token", newToken);
  },
  setHints: async (hintsUsed, questionId, update, timeTaken) => {
    set({ hintsUsedInLastQuestion: hintsUsed });
    if (update) {
      const res = await fetch("http://localhost:5000/user/update-hints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${get().token}`,
        },
        body: JSON.stringify({ questionId, timeTaken }),
      });
      const data = await res.json();
      if (data.success === 1) {
        localStorage.setItem("hints", hintsUsed + 1);
      }
    }
  },
  setIncorrectAns: async (incorrectAns, questionId, update, timeTaken) => {
    set({ incorrectAnswerInLastQuestion: incorrectAns, timeTaken });
    if (update) {
      const res = await fetch(
        "http://localhost:5000/user/update-incorrect-ans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${get().token}`,
          },
          body: JSON.stringify({ questionId, timeTaken }),
        }
      );
      const data = await res.json();
      if (data.success === 1) {
        localStorage.setItem("incorrectAns", incorrectAns + 1);
      }
    }
  },
}));
