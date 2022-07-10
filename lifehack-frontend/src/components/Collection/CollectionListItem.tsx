import { Flex, VStack, SimpleGrid, Text, Image, Button } from "@chakra-ui/react";
import axios from "../../helper/axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CollectionItem } from "../../types/CollectionItem";
import QuantitySelector from "../QuantitySelector";
import { useDispatch } from "react-redux";
import { deleteCollectionItem, reducePoints } from "../../features/collection/collectionSlice";

type Props = {
	cartItem: CollectionItem;
};

function CollectionListItem({ cartItem }: Props) {
	const dispatch = useDispatch();
	const { products } = useContext(AppContext);
	const product = products.find((p) => p.id === cartItem.itemId);

	if (!product) {
		return null;
	}

	const deleteItemHandler = () => {
		axios
			.post("/remove", {
				CollectionItem: { id: cartItem.id },
				qty: cartItem.quantity,
			})
			.then(() => {
				dispatch(deleteCollectionItem(cartItem.id));
				dispatch(reducePoints(product.points * cartItem.quantity));
			});
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

export default CollectionListItem;
