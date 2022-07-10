import { Flex, Text } from "@chakra-ui/react";
import { Item } from "../../types/Item";
import ProductItem from "./ProductItem";

type Props = {
	products: Item[];
};

function ProductList({ products }: Props) {
	if (products.length === 0) {
		return (
			<Text mx="auto" fontSize="3xl" textAlign="center" mt={"35vh"}>
				No results.
			</Text>
		);
	}

	return (
		<Flex direction="column" w="90vw" mx="auto">
			{products.map((product) => (
				<ProductItem product={product} key={product.id} />
			))}
		</Flex>
	);
}

export default ProductList;
