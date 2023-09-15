import create from "zustand";
import { alpha, styled, Switch } from "@mui/material";

const useUtilityStore = create((set) => ({
  loggedUser: {
    name: "",
    email: "",
  },
  setLoggedUser: (value) => set({ loggedUser: value }),

  isLoading: false,
  setLoading: (status) => set((state) => (state.isLoading = status)),

  isLoadingSearch: false,
  setLoadingSearch: (status) => set((state) => (state.isLoadingSearch = status)),

  role: null,
  setRole: (data) => set({ role: data }),

  showImagePopup: false,
  setShowImagePopup: (value) => set({ showImagePopup: value }),

  showImagePreviewSRC: "",
  setShowImagePreviewSRC: (value) => set({ showImagePreviewSRC: value }),

}));

export const MuiCustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FB607F',
    '&:hover': {
      backgroundColor: alpha('#FB607F', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FB607F',
  },
}));

export default useUtilityStore;
