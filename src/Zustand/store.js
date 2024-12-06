import create from 'zustand';

const useCartStore = create((set) => ({
    searchText: "",
  setSearchText: (text) => set({ searchText: text }),
    items:[],
    addItem: (item) => set((state) => ({items: [...state.items, item]  }) ),
    clearCart: () => set({items:[]}),

}));
export default useCartStore;










// // store.js
// import create from "zustand";

// const useStore = create((set) => ({
//   searchText: "",
//   setSearchText: (text) => set({ searchText: text }),
// }));

// export default useStore;
