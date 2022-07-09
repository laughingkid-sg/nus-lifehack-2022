import { Flex, Button, Alert, Text, VStack, Select, AlertIcon, Heading, Divider } from "@chakra-ui/react";
import axios from "../../helper/axios";
import React, { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {
	hasCartItems,
	selectCartId,
	selectCartItems,
	selectCollectionDate,
	selectTotalPoints,
	setSelectedDateTime,
} from "../../features/cart/cartSlice";
import CartListItem from "./CartListItem";

// @ts-ignore
const telegram = window.Telegram.WebApp;

function Cart() {
	const navigate = useNavigate();
	const app = useContext(AppContext);
	const dispatch = useDispatch();

	const cartId = useSelector(selectCartId);
	const cartItems = useSelector(selectCartItems, shallowEqual);
	const points = useSelector(selectTotalPoints);
	const dateTime = useSelector(selectCollectionDate);
	const itemsInCart = useSelector(hasCartItems);

	const dateInRange = dateTime ? app.dateOptions.find((dOpt) => dOpt === dateTime) : true;

	const changeDateTimeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelectedDateTime(e.target.value));
	};

	const checkoutItemsHandler = () => {
		if (!dateTime) {
			// Send error message to user
			return;
		}

		axios
			.post("/schedule", {
				Collection: { id: cartId, date: dateTime },
			})
			.then(() => {
				telegram.close();
			});
	};

	return (
		<Flex direction="column" h="100vh" mt={2}>
			{/* Cart Header */}
			<Flex
				direction="row"
				alignItems="center"
				backgroundColor="white"
				px={3}
				py={1}
				borderBottom="1px solid rgba(0, 0, 0, 0.36)"
			>
				{/* <Link to="/">
					<BiArrowBack fontSize="2em" />
				</Link> */}
				<Button onClick={() => navigate(-1)}>
					<BiArrowBack /> Go Back
				</Button>
				<Heading ml={2}>Your Items</Heading>
			</Flex>
			{itemsInCart ? (
				<Flex
					direction="column"
					mb={5}
					// borderBottom="1px solid grey"
					// borderTop="1px solid grey"
					pb={1}
					backgroundColor="white"
					mx="auto"
				>
					<VStack spacing="8px" alignSelf="flex-start" mt={6}>
						{cartItems.map((ci) => (
							<CartListItem key={ci.id} cartItem={ci} />
						))}
					</VStack>
					<Divider my={6} />
					<Heading w="85vw" mx="auto">
						Selected Timeslot
					</Heading>
					{!dateTime && (
						<Alert status="info">
							<AlertIcon /> Please enter a timeslot.
						</Alert>
					)}
					{!dateInRange && (
						<Alert status="warning" mt={4}>
							<AlertIcon /> It seems that the selected timeslot is not available. Please select a new
							timeslot.
						</Alert>
					)}
					<Select
						onChange={changeDateTimeHandler}
						placeholder="Enter a timeslot for collection"
						my={4}
						w="85vw"
						mx="auto"
					>
						{app.dateOptions.map((d, i) => (
							<option key={i}>{d}</option>
						))}
					</Select>
					<Text fontSize="lg" w="85vw" mx="auto">
						Estimated points earned: {points}{" "}
					</Text>
					<Button
						w="100vw"
						colorScheme="telegram"
						onClick={checkoutItemsHandler}
						position="fixed"
						bottom={0}
						size="lg"
						py={4}
					>
						Checkout
					</Button>
				</Flex>
			) : (
				<Flex
					flexDir="column"
					w="80vw"
					justifyContent="center"
					my="auto"
					mx="auto"
					backgroundColor="white"
					borderRadius={16}
					py={16}
					px={8}
				>
					<Heading textAlign="center" py={6}>
						You have no items to checkout
					</Heading>
					<Button onClick={() => navigate(-1)} colorScheme="green">
						Go Back
					</Button>
				</Flex>
			)}
		</Flex>
	);
}

export default Cart;