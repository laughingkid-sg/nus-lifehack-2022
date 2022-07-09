import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCollectionItems } from "../../features/collection/collectionSlice";
import { Item } from "../../types/Item";
import QuantitySelector from "../QuantitySelector";

type Props = {
	product: Item;
};

function ProductItem({ product }: Props) {
	const navigate = useNavigate();
	const cartItem = useSelector(selectCollectionItems).find((ci) => product.id === ci.itemId);

	return (
		<Flex
			direction="row"
			height="20%"
			borderBottom="1px solid #CBD5E0"
			backgroundColor="white"
			borderRadius={12}
			border="1px solid rgba(0, 0, 0, 0.24)"
			my={2}
			overflow="hidden"
		>
			<Image
				src={product.productImg[0]}
				alt={product.name}
				objectFit="fill"
				width="10em"
				height="10em"
				alignSelf="center"
				onClick={() => navigate(`/product/${product.id}`)}
			/>
			<Flex direction="column" justifyContent="center" mx={2} my={1}>
				<Box px="8px">
					<Text fontSize="md" noOfLines={2}>
						{product.name}
					</Text>
				</Box>
				{/* Controls to change product quantity */}
				<Flex direction="row" justifyContent="space-between" alignItems="center">
					<QuantitySelector product={product} cartItem={cartItem} />
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProductItem;
