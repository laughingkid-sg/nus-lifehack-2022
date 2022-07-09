import { Flex, Text } from "@chakra-ui/react";
import { Item } from "../../types/Item";
import ProductItem from "./ProductItem";

type Props = {
	products: Item[];
};

function ProductList({ products }: Props) {
	// TODO Style this
	if (products.length === 0) {
		return <Text>No results.</Text>;
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
