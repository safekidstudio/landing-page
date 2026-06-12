import { create } from "zustand";

export type AgeGroup = "t2_5" | "t6_12" | "t13_18";
export type DeviceType = "phone" | "tablet" | "computer";
export type BillingCycle = "monthly" | "yearly";

interface AppState {
  ageGroup: AgeGroup;
  deviceType: DeviceType;
  billingCycle: BillingCycle;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  setDeviceType: (deviceType: DeviceType) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
}

export const useAppStore = create<AppState>((set) => ({
  ageGroup: "t6_12",
  deviceType: "phone",
  billingCycle: "monthly",
  setAgeGroup: (ageGroup) => set({ ageGroup }),
  setDeviceType: (deviceType) => set({ deviceType }),
  setBillingCycle: (billingCycle) => set({ billingCycle }),
}));
