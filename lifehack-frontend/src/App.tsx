import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Products from "./components/Product/Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/Product/ProductDetail";
import { useEffect, useContext } from "react";
import Collection from "./components/Collection/Cart";
import { AppContext } from "./context/AppContext";
import { CATEGORIES } from "./dummy";
import axios from "./helper/axios";
import { Item } from "./types/Item";
import { useDispatch } from "react-redux";
import { setCollectionId, setCollectionItems, setPoints } from "./features/collection/collectionSlice";
import { CollectionItem } from "./types/CollectionItem";

// @ts-ignore
const telegram = window.Telegram.WebApp;

export const App = () => {
	const app = useContext(AppContext);
	const dispatch = useDispatch();

	useEffect(() => {
		const init = async () => {
			console.log(process.env.REACT_APP_HOST);
			// Axios fetch call
			const { data } = await axios.post("/user", {
				User: { telegramId: telegram.initDataUnsafe?.id ? telegram.initDataUnsafe.id : 236682617 },
			});

			console.log(data);
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
			alert(telegram.initDataUnsafe.id);
			app.initShop(products, CATEGORIES);
			dispatch(setCollectionItems(collectionItems));
			dispatch(setCollectionId(collectionList.id));
			dispatch(setPoints(points));
		};

		init();
		// If there is no collection, direct them to date select page
		// Maybe if its past their selected date we need to ask them to select again at /cart
	}, []);

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
