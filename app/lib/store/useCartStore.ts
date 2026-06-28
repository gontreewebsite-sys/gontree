import { create } from "zustand";

export interface CartItem {
  id: number; // product id
  cartKey: string; // unique per product+color+size
  name: string;
  price: number; // numeric, e.g. 135000
  photo: string; // emoji/icon source
  color: string;
  size: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartKey">) => void;
  removeItem: (cartKey: string) => void;
  updateQty: (cartKey: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const cartKey = `${item.id}-${item.color}-${item.size}`;
    set((state) => {
      const existing = state.items.find((i) => i.cartKey === cartKey);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.cartKey === cartKey ? { ...i, qty: i.qty + item.qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, cartKey }] };
    });
  },

  removeItem: (cartKey) =>
    set((state) => ({ items: state.items.filter((i) => i.cartKey !== cartKey) })),

  updateQty: (cartKey, qty) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.cartKey === cartKey ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    })),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));