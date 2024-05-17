import { create } from "zustand";

interface AlertsState {
  alertMessage: string;
  alertLevel: AlertLevel;
  alertVisible: boolean;
}

type AlertLevel = "info" | "success" | "warning" | "error";

interface AlertsStore {
  alerts: AlertsState;
  showAlert: (payload: { message: string; level: AlertLevel }) => void;
  hideAlert: () => void;
}

const useAlertsStore = create<AlertsStore>((set) => ({
  alerts: {
    alertMessage: "",
    alertLevel: "info",
    alertVisible: false,
  },
  showAlert: ({ message, level }) => {
    set((state) => ({
      alerts: {
        ...state.alerts,
        alertMessage: message,
        alertLevel: level,
        alertVisible: true,
      },
    }));
  },
  hideAlert: () => {
    set((state) => ({
      alerts: {
        ...state.alerts,
        alertVisible: false,
      },
    }));
  },
}));

export { useAlertsStore };
