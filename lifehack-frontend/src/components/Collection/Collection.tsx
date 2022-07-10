import {
	Flex,
	Button,
	Alert,
	Text,
	VStack,
	Select,
	AlertIcon,
	Heading,
	Divider,
	useToast,
	Box,
} from "@chakra-ui/react";
import axios from "../../helper/axios";
import React, { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {
	selectCollectionId,
	selectCollectionItems,
	selectCollectionDate,
	selectTotalPoints,
	setSelectedDateTime,
} from "../../features/collection/collectionSlice";
import CollectionListItem from "./CollectionListItem";

// @ts-ignore
const telegram = window.Telegram.WebApp;

function Collection() {
	const navigate = useNavigate();
	const app = useContext(AppContext);
	const dispatch = useDispatch();
	const toast = useToast();

	const collectionId = useSelector(selectCollectionId);
	const collectionItems = useSelector(selectCollectionItems, shallowEqual);
	const points = useSelector(selectTotalPoints);
	const dateTime = useSelector(selectCollectionDate);

	const dateInRange = dateTime ? app.dateOptions.find((dOpt) => dOpt === dateTime) : true;

	const changeDateTimeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelectedDateTime(e.target.value));
	};

	const checkoutItemsHandler = async () => {
		if (!dateTime) {
			toast({
				title: "Error",
				description: "Remember to enter a timeslot before checking out",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "top",
			});
			return;
		}

		toast({
			title: "Processing your collection",
			status: "info",
			duration: 3500,
			isClosable: true,
			position: "top",
		});
		try {
			await axios.post("/schedule", {
				Collection: { Id: collectionId, Date: dateTime },
			});
			await axios.post("/telegraf/confirm", {
				// User: {
				// 	telegramId: telegram.initDataUnsafe.user?.id ? telegram.initDataUnsafe.user.id : 236682617,
				// },
				User: { telegramId: telegram.initDataUnsafe.user.id },
				Collection: { id: collectionId, collectionDate: dateTime },
			});

			toast({
				title: "Successful",
				description: "You may close the web app now",
				isClosable: true,
				duration: 3500,
				position: "top",
				status: "success",
			});
			telegram.close();
		} catch (e) {
			toast({
				title: "Oops!",
				description: "Something went wrong. Please check your details and try again.",
				isClosable: true,
				duration: 3500,
				position: "top",
				status: "error",
			});
		}
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
				<Button onClick={() => navigate(-1)}>
					<BiArrowBack /> Go Back
				</Button>
				<Heading ml={2}>Your Items</Heading>
			</Flex>
			{collectionItems.length > 0 ? (
				<Flex direction="column" mb={5} pb={1} backgroundColor="white" mx="auto">
					<VStack spacing="8px" alignSelf="flex-start" mt={6}>
						{collectionItems.map((ci) => (
							<CollectionListItem key={ci.id} cartItem={ci} />
						))}
					</VStack>
					<Divider my={6} />
					<Heading w="85vw" mx="auto">
						Selected Timeslot
					</Heading>
					{!dateTime && (
						<Alert status="info" mt={4}>
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
					<Box w="85vw" mx="auto" py={4} px={8} border="1px solid rgba(0, 0, 0, 0.36)" borderRadius={16}>
						<Text fontSize="lg">Estimated points earned: {points}</Text>
					</Box>
					<Box mb="60px"></Box>
					<Button
						w="100vw"
						colorScheme="telegram"
						onClick={checkoutItemsHandler}
						position="fixed"
						bottom={0}
						size="lg"
						py={4}
					>
						Confirm Collection
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

export default Collection;
