import create from "zustand";

const useInstructorStore = create((set) => ({

  instructorIndex: {},
  setInstructorIndex: (value) => set({ instructorIndex: value }),

  instructorSearchKey: "",
  setInstructorSearchKey: (value) => set({ instructorSearchKey: value }),

}));

export default useInstructorStore;

