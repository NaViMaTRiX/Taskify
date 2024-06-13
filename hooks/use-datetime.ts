import { create } from "zustand";

type DataTimeStore = {
	isVisible: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useDateTimeStore = create<DataTimeStore>((set) => ({
	isVisible: false,
	onOpen: () => set({ isVisible: true }),
	onClose: () => set({ isVisible: false }),
}));
