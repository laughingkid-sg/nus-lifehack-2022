import { Flex, Checkbox, VStack, SimpleGrid, Text, Image, Box, Button } from "@chakra-ui/react";
import axios from "../../helper/axios";
import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { PRODUCTS } from "../../dummy";
import { CartItem, ResponseCartItem } from "../../types/CartItem";
import QuantitySelector from "../QuantitySelector";
import { useDispatch } from "react-redux";
import { deleteCartItem, reducePoints } from "../../features/cart/cartSlice";

type Props = {
	cartItem: CartItem;
};

function CartListItem({ cartItem }: Props) {
	const dispatch = useDispatch();
	const { products } = useContext(AppContext);
	const product = products.find((p) => p.id === cartItem.itemId);

	if (!product) {
		return null;
	}

	const deleteItemHandler = async () => {
		const deletedItem: ResponseCartItem = await axios.post("/remove", {
			CollectionItem: { id: cartItem.id },
			qty: cartItem.quantity,
		});

		dispatch(deleteCartItem(deletedItem.id));
		dispatch(reducePoints(product.points * cartItem.quantity));
	};

	return (
		<Flex direction="row" alignItems="center" w="100vw">
			<Image src={product.productImg[0]} alt={product.name} width="6em" height="6em" />
			<VStack flexGrow="1" alignItems="left" ml={2} pr={5}>
				<Text noOfLines={2} fontSize="md">
					{product.name}
				</Text>
				<SimpleGrid templateColumns={"1fr 1fr"} justifyContent="end" columnGap="1em">
					<QuantitySelector product={product} cartItem={cartItem} size="sm" />
					<Button size="sm" colorScheme="red" onClick={deleteItemHandler}>
						Delete
					</Button>
				</SimpleGrid>
			</VStack>
		</Flex>
	);
}

export default CartListItem;
