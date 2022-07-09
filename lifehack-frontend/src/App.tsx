import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Products from "./components/Product/Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/Product/ProductDetail";
import { useEffect, useContext } from "react";
import Cart from "./components/Cart/Cart";
import { AppContext } from "./context/AppContext";
import { CATEGORIES } from "./dummy";
import axios from "./helper/axios";
import { Product } from "./types/Product";
import { useDispatch } from "react-redux";
import { setCartId, setCartItems, setPoints } from "./features/cart/cartSlice";
import { CartItem } from "./types/CartItem";

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
			const products: Product[] = itemsList.map((il: any) => {
				return {
					id: il.id,
					name: il.name,
					description: il.description,
					productImg: JSON.parse(il.productImg),
					category: il.category,
					points: il.points,
				};
			});
			const cartItems: CartItem[] = collectionList.collectionItems.map((ci: any) => {
				return {
					id: ci.id,
					quantity: ci.qty,
					itemId: ci.item.id,
				};
			});

			console.log(products);
			const points = collectionList.collectionItems.reduce((total: number, ci: any) => {
				const product = products.find((il) => il.id === ci.item.id);

				if (!product) {
					return total;
				}

				console.log(product);
				return total + ci.qty * product.points;
			}, 0);
			console.log(points);
			app.initShop(products, CATEGORIES);
			dispatch(setCartItems(cartItems));
			dispatch(setCartId(collectionList.id));
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
					<Route path="/cart" element={<Cart />} />
					<Route path="/" element={<Products />} />
				</Routes>
			</Box>
		</ChakraProvider>
	);
};
