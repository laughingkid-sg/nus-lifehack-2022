import { Flex, IconButton, NumberInput, NumberInputField, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
	addCollectionItem,
	addPoints,
	deleteCollectionItem,
	reducePoints,
	selectCollectionId,
	updateCollectionItem,
} from "../features/collection/collectionSlice";
import axios from "../helper/axios";
import { CollectionItem, ResponseCollectionItem } from "../types/CollectionItem";
import { Item } from "../types/Item";

interface Props {
	cartItem: CollectionItem | undefined;
	product: Item;
	size?: "md" | "sm" | "xs";
}

// @ts-ignore
const telegram = window.Telegram.WebApp;

function QuantitySelector({ product, cartItem, size }: Props) {
	const dispatch = useDispatch();
	const toast = useToast();
	const cartId = useSelector(selectCollectionId);
	// TODO Update
	const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 0);
	const [fieldQty, setFieldQty] = useState<string>(quantity.toString());

	const changeQuantityHandler = async (amount: number) => {
		// No difference in value or user tries to make product negative
		if (amount === 0 || amount + quantity < 0) {
			toast({
				title: "No changes made.",
				status: "info",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		if (!cartItem || amount > 0) {
			const addItem: ResponseCollectionItem = (
				await axios.post("/add", {
					Collection: { id: cartId },
					Item: { id: product.id },
					qty: amount,
					User: { telegramId: telegram.initDataUnsafe.user.id },
				})
			).data;

			if (!cartItem) {
				console.log("Create cartItem");
				dispatch(
					addCollectionItem({
						id: addItem.id,
						itemId: product.id,
						quantity: amount,
					})
				);
			} else {
				const newCartItem = { ...cartItem, quantity: addItem.qty };
				dispatch(updateCollectionItem(newCartItem));
			}
			dispatch(addPoints(product.points * amount));
			setQuantity(addItem.qty);
			setFieldQty(addItem.qty.toString());
		} else {
			const removeItem: ResponseCollectionItem = (
				await axios.post("/remove", {
					CollectionItem: { id: cartItem.id },
					qty: Math.abs(amount),
				})
			).data;

			if (removeItem.qty === 0) {
				dispatch(deleteCollectionItem(removeItem.id));
			} else {
				dispatch(updateCollectionItem({ ...cartItem, quantity: removeItem.qty }));
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
