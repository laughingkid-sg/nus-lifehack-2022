import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Products from "./components/Product/Products";
import ProductDetail from "./components/Product/ProductDetail";
import Collection from "./components/Collection/Collection";
import { AppContext } from "./context/AppContext";
import { CATEGORIES } from "./dummy";
import { setCollectionId, setCollectionItems, setPoints } from "./features/collection/collectionSlice";
import axios from "./helper/axios";
import { Item } from "./types/Item";
import { CollectionItem } from "./types/CollectionItem";

// @ts-ignore
const telegram = window.Telegram.WebApp;

export const App = () => {
	const app = useContext(AppContext);
	const dispatch = useDispatch();
	const [isInitialised, setIsInitialised] = useState(false);

	useEffect(() => {
		const init = async () => {
			// Axios fetch call
			// console.log(telegram.initDataUnsafe.user.id);
			const { data } = await axios.post("/user", {
				User: { telegramId: telegram.initDataUnsafe.user.id },
				// User: { telegramId: telegram.initDataUnsafe.user?.id ? telegram.initDataUnsafe.user.id : 236682617 },
			});

			// console.log(data);
			const { itemsList, collectionList } = data;
			const products: Item[] = itemsList.map((il: any) => {
				return {
					id: il.id,
					name: il.name,
					description: il.description,
					productImg: JSON.parse(il.productImg),
					category: il.category,
					points: il.points,
				};
			});
			const collectionItems: CollectionItem[] = collectionList.collectionItems.map((ci: any) => {
				return {
					id: ci.id,
					quantity: ci.qty,
					itemId: ci.item.id,
				};
			});

			const points = collectionList.collectionItems.reduce((total: number, ci: any) => {
				const product = products.find((il) => il.id === ci.item.id);

				if (!product) {
					return total;
				}

				return total + ci.qty * product.points;
			}, 0);
			app.initShop(products, CATEGORIES);
			dispatch(setCollectionItems(collectionItems));
			dispatch(setCollectionId(collectionList.id));
			dispatch(setPoints(points));
			setIsInitialised(true);
			telegram.expand();
		};

		if (!isInitialised) {
			init();
		}
	}, [isInitialised, app, dispatch]);

	return (
		<ChakraProvider theme={theme}>
			<Box>
				<Routes>
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="/cart" element={<Collection />} />
					<Route path="/" element={<Products />} />
				</Routes>
			</Box>
		</ChakraProvider>
	);
};
