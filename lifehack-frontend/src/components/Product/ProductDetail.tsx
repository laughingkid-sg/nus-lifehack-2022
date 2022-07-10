import { Box, Button, Alert, SimpleGrid, Select, Text, Image, useToast } from "@chakra-ui/react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useContext, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "../../helper/axios";
import { useDispatch, useSelector } from "react-redux";
import {
	addCollectionItem,
	addPoints,
	selectCollectionId,
	selectCollectionItems,
	updateCollectionItem,
} from "../../features/collection/collectionSlice";
import { ResponseCollectionItem } from "../../types/CollectionItem";

// @ts-ignore
const telegram = window.Telegram.WebApp;

function ProductDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	const dispatch = useDispatch();
	const collectionId = useSelector(selectCollectionId);
	const collectionItem = useSelector(selectCollectionItems).find((ci) => ci.itemId === id);
	const { products } = useContext(AppContext);
	const [quantity, setQuantity] = useState(0);

	const product = products.find((p) => id === p.id);

	if (!product) {
		return <h1 onClick={() => navigate(-1)}>Product not found!</h1>;
	}

	const quantityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let changedVal = parseInt(e.target.value);
		if (changedVal === 0) {
			setQuantity(0);
			return;
		}

		setQuantity(changedVal);
	};

	const addToCartHandler = async () => {
		if (quantity === 0) {
			toast({
				title: "No changes made.",
				status: "info",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		const addItem: ResponseCollectionItem = (
			await axios.post("/add", {
				Collection: { id: collectionId },
				Item: { id: product.id },
				qty: quantity,
				// User: { telegramId: telegram.initDataUnsafe.user.id },
				User: { telegramId: telegram.initDataUnsafe.user?.id ? telegram.initDataUnsafe.user.id : 236682617 },
			})
		).data;

		if (collectionItem) {
			dispatch(updateCollectionItem({ ...collectionItem, quantity: addItem.qty }));
		} else {
			dispatch(addCollectionItem({ id: addItem.id, itemId: product.id, quantity: addItem.qty }));
		}
		dispatch(addPoints(product.points * quantity));
		setQuantity(0);
		toast({
			title: "Success",
			description: `Added ${quantity} item(s).`,
			isClosable: true,
			duration: 5000,
			position: "top",
			status: "success",
		});
	};

	return (
		<>
			<Box h="92vh" overflow="scroll" pb={7} backgroundColor="#F7FAFC">
				<Button position="absolute" top={15} left={15} zIndex={10} onClick={() => navigate(-1)}>
					<BiArrowBack style={{ marginRight: "4px" }} />
					Back
				</Button>
				{/* Carousel */}
				<Swiper pagination={true} modules={[Pagination]} style={{ width: "100vw" }}>
					{product.productImg.map((src, i) => (
						<SwiperSlide key={i}>
							<Image src={src} />
						</SwiperSlide>
					))}
				</Swiper>
				<Box w="85%" mx="auto">
					<Text fontSize="2xl" fontWeight={600} pt={3} pb={2}>
						{product.name}
					</Text>
					{/* Product description */}
					<Text fontSize="lg" fontWeight={600} py={2}>
						Description
					</Text>
					{product.description.split("\\n").map((t, i) => (
						<Text key={i}>{t}</Text>
					))}
				</Box>
			</Box>
			{/* Footer */}
			<Box position="fixed" bottom={0} w="100%" backgroundColor="lightgray" px={4} pt={3} h="8vh">
				<SimpleGrid columns={2} columnGap="16px">
					<Select onChange={quantityChangeHandler} backgroundColor="white" value={quantity}>
						{Array.apply(0, Array(11)).map((x, i) => (
							<option value={i} key={i}>
								{i}
							</option>
						))}
					</Select>
					<Button colorScheme="telegram" onClick={addToCartHandler}>
						Add to Cart
					</Button>
				</SimpleGrid>
			</Box>
		</>
	);
}

export default ProductDetail;
