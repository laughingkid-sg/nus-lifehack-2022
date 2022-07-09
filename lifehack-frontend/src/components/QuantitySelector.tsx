import { Flex, IconButton, NumberInput, NumberInputField } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
	addCartItem,
	addPoints,
	deleteCartItem,
	reducePoints,
	selectCartId,
	updateCartItem,
} from "../features/cart/cartSlice";
import axios from "../helper/axios";
import { CartItem, ResponseCartItem } from "../types/CartItem";
import { Product } from "../types/Product";

interface Props {
	cartItem: CartItem | undefined;
	product: Product;
	size?: "md" | "sm" | "xs";
}

// @ts-ignore
const telegram = window.Telegram.WebApp;

function QuantitySelector({ product, cartItem, size }: Props) {
	const dispatch = useDispatch();
	const cartId = useSelector(selectCartId);
	// TODO Update
	const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 0);
	const [fieldQty, setFieldQty] = useState<string>(quantity.toString());

	const changeQuantityHandler = async (amount: number) => {
		// No difference in value
		if (amount === 0) {
			return;
		}

		if (!cartItem || amount > 0) {
			const addItem: ResponseCartItem = (
				await axios.post("/add", {
					Collection: { id: cartId },
					Item: { id: product.id },
					qty: amount,
					User: { id: telegram.initDataUnsafe?.id ? telegram.initDataUnsafe.id : 236682617 },
				})
			).data;

			if (!cartItem) {
				console.log("Create cartItem");
				dispatch(
					addCartItem({
						id: addItem.id,
						itemId: product.id,
						quantity: amount,
					})
				);
			} else {
				const newCartItem = { ...cartItem, quantity: addItem.qty };
				dispatch(updateCartItem(newCartItem));
			}
			dispatch(addPoints(product.points * amount));
			setQuantity(addItem.qty);
			setFieldQty(addItem.qty.toString());
		} else {
			const removeItem: ResponseCartItem = (
				await axios.post("/remove", {
					CollectionItem: { id: cartItem.id },
					qty: Math.abs(amount),
				})
			).data;

			if (removeItem.qty === 0) {
				dispatch(deleteCartItem(removeItem.id));
			} else {
				dispatch(updateCartItem({ ...cartItem, quantity: removeItem.qty }));
			}

			console.log(removeItem.qty);
			dispatch(reducePoints(product.points * Math.abs(amount)));
			setQuantity(removeItem.qty);
			setFieldQty(removeItem.qty.toString());
		}
	};

	const setQuantityHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		if (e.target.value === "") {
			setFieldQty(quantity.toString());
			return;
		}

		const newVal = parseInt(e.target.value) - quantity;
		console.log(newVal);
		changeQuantityHandler(newVal);
	};

	return (
		<Flex direction="row" w="100%" justifyContent="space-evenly" alignItems="center">
			<IconButton
				aria-label="minus-product"
				icon={<FiMinus />}
				size={size}
				disabled={quantity <= 0}
				colorScheme="blackAlpha"
				onClick={() => changeQuantityHandler(-1)}
			/>
			<NumberInput
				min={0}
				// max={Math.min(999, product.stock)}
				precision={0}
				clampValueOnBlur={true}
				value={fieldQty}
				onChange={(qtyStr) => setFieldQty(qtyStr)}
				onBlur={setQuantityHandler}
				onFocus={(e) => e.stopPropagation()}
				size={size}
				maxW={75}
			>
				<NumberInputField textAlign="center" paddingInline={0} />
			</NumberInput>
			<IconButton
				aria-label="add-product"
				icon={<FiPlus />}
				size={size}
				colorScheme="telegram"
				// disabled={quantity >= Math.min(999, product.stock)}
				onClick={() => changeQuantityHandler(1)}
			/>
		</Flex>
	);
}

export default QuantitySelector;
