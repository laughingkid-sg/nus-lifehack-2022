import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { CollectionItem } from "../../types/CollectionItem";

export interface CartState {
	collectionId: string;
	collectionItems: CollectionItem[];
	// In ISOString 8601 standard
	// https://en.wikipedia.org/wiki/ISO_8601
	selectedDateTime: string | null;
	totalPoints: number;
}

const initialState: CartState = {
	collectionId: "",
	collectionItems: [],
	selectedDateTime: null,
	// selectedDateTime: "1 Jul Morning (9am-12pm)",
	totalPoints: 0,
};

export const collectionSlice = createSlice({
	name: "collection",
	initialState,
	reducers: {
		setCollectionId: (state, action: PayloadAction<string>) => {
			state.collectionId = action.payload;
		},
		setSelectedDateTime: (state, action: PayloadAction<string>) => {
			state.selectedDateTime = action.payload;
		},
		setCollectionItems: (state, action: PayloadAction<CollectionItem[]>) => {
			state.collectionItems = action.payload;
		},
		addCollectionItem: (state, action: PayloadAction<CollectionItem>) => {
			state.collectionItems.push(action.payload);
		},
		deleteCollectionItem: (state, action: PayloadAction<string>) => {
			state.collectionItems = state.collectionItems.filter((ci) => ci.id !== action.payload);
		},
		updateCollectionItem: (state, action: PayloadAction<CollectionItem>) => {
			const collectionItem = action.payload;
			state.collectionItems = state.collectionItems.map((ci) =>
				ci.id === collectionItem.id ? collectionItem : ci
			);
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
const selectCollectionItems = (state: RootState) => state.cart.collectionItems;

const selectTotalPoints = (state: RootState) => state.cart.totalPoints;

const selectCollectionDate = (state: RootState) => state.cart.selectedDateTime;

const hasCollectionItems = (state: RootState) => state.cart.collectionItems.length > 0;

const selectCollectionId = (state: RootState) => state.cart.collectionId;

// Export reducers
export const {
	setSelectedDateTime,
	addCollectionItem,
	deleteCollectionItem,
	updateCollectionItem,
	addPoints,
	reducePoints,
	setPoints,
	setCollectionItems,
	setCollectionId,
} = collectionSlice.actions;

// Export selectors
export { selectCollectionItems, selectTotalPoints, selectCollectionDate, hasCollectionItems, selectCollectionId };

export default collectionSlice.reducer;
