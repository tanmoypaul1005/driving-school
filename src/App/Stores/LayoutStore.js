import create from "zustand";

const useLayoutStore = create((set) => ({
  barTitle: "Set a title for the bar",
  setBarTitle: (titleText) => set((state) => (state.barTitle = titleText)),

  activeSection: "",
  setActiveSection: (value) => set({ activeSection: value }),

  showLogoutModal: false,
  setShowLogoutModal: (value) => set({ showLogoutModal: value }),

  expandRole: false,
  setExpandRole: (value) => set({ expandRole: value }),

  expandSettings: false,
  setExpandSettings: (value) => set({ expandSettings: value }),

  sidebarItemsList: [],
  setSidebarItemsList: (value) => set({ sidebarItemsList: value }),
}));

export default useLayoutStore;
