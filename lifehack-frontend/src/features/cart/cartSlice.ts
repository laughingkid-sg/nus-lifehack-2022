import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { CartItem } from "../../types/CartItem";

export interface CartState {
	cartId: string;
	cartItems: CartItem[];
	// In ISOString 8601 standard
	// https://en.wikipedia.org/wiki/ISO_8601
	selectedDateTime: string | null;
	totalPoints: number;
}

const initialState: CartState = {
	cartId: "",
	cartItems: [],
	selectedDateTime: null,
	// selectedDateTime: "1 Jul Morning (9am-12pm)",
	totalPoints: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCartId: (state, action: PayloadAction<string>) => {
			state.cartId = action.payload;
		},
		setSelectedDateTime: (state, action: PayloadAction<string>) => {
			state.selectedDateTime = action.payload;
		},
		setCartItems: (state, action: PayloadAction<CartItem[]>) => {
			state.cartItems = action.payload;
		},
		addCartItem: (state, action: PayloadAction<CartItem>) => {
			state.cartItems.push(action.payload);
		},
		deleteCartItem: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter((ci) => ci.id !== action.payload);
		},
		updateCartItem: (state, action: PayloadAction<CartItem>) => {
			const cartItem = action.payload;
			state.cartItems = state.cartItems.map((ci) => (ci.id === cartItem.id ? cartItem : ci));
		},
		addPoints: (state, action: PayloadAction<number>) => {
			state.totalPoints += action.payload;
		},
		reducePoints: (state, action: PayloadAction<number>) => {
			state.totalPoints = Math.max(0, state.totalPoints - action.payload);
		},
		setPoints: (state, action: PayloadAction<number>) => {
			state.totalPoints = action.payload;
		},
	},
});

// Selectors
const selectCartItems = (state: RootState) => state.cart.cartItems;

const selectTotalPoints = (state: RootState) => state.cart.totalPoints;

const selectCollectionDate = (state: RootState) => state.cart.selectedDateTime;

const hasCartItems = (state: RootState) => state.cart.cartItems.length > 0;

const selectCartId = (state: RootState) => state.cart.cartId;

// Export reducers
export const {
	setSelectedDateTime,
	addCartItem,
	deleteCartItem,
	updateCartItem,
	addPoints,
	reducePoints,
	setPoints,
	setCartItems,
	setCartId,
} = cartSlice.actions;

// Export selectors
export { selectCartItems, selectTotalPoints, selectCollectionDate, hasCartItems, selectCartId };

export default cartSlice.reducer;
