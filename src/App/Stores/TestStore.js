import create from "zustand";

const UseTestStore = create((set) => ({

  showTestModal: false,
  setShowTestModal: (value) => set({ showTestModal: value }),

  showEditPassModal: false,
  setShowEditPassModal: (value) => set({ showEditPassModal: value }),

}));

export default UseTestStore;
