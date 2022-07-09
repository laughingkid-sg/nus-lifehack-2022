import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../dummy";
import { Product } from "../../types/Product";
import CategorySearch from "../CategorySearch";
import ProductList from "./ProductList";
import SearchBar from "../SearchBar";
import { useSelector } from "react-redux";
import { hasCartItems } from "../../features/cart/cartSlice";
import { AppContext } from "../../context/AppContext";

function Products() {
	const navigate = useNavigate();
	const showMainButton = useSelector(hasCartItems);
	const { products, categories } = useContext(AppContext);

	const [keywordSearch, setKeywordSearch] = useState<string>("");
	const [categorySearch, setCategorySearch] = useState<string[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

	useEffect(() => {
		if (products.length === 0 || (keywordSearch === "" && categorySearch.length === 0)) {
			setFilteredProducts(products);
			return;
		}

		let newFiltered = PRODUCTS;

		if (categorySearch.length > 0) {
			newFiltered = newFiltered.filter((p) => categorySearch.includes(p.category));
		}

		newFiltered = newFiltered.filter((p) => p.name.toLowerCase().includes(keywordSearch.toLowerCase()));
		setFilteredProducts(newFiltered);
	}, [categorySearch, keywordSearch, products]);

	const updateKeyword = useCallback((search: string) => {
		setKeywordSearch(search);
	}, []);

	const categoryToggleHandler = (categoryName: string) => {
		const idx = categorySearch.indexOf(categoryName);
		if (idx === -1) {
			setCategorySearch((prevState) => [...prevState, categoryName]);
		} else {
			setCategorySearch((prevState) => prevState.filter((c) => c !== categoryName));
		}
	};

	return (
		<Box>
			<SearchBar keyword={keywordSearch} updateKeyword={updateKeyword} />
			<CategorySearch selectedCategories={categorySearch} toggleSelect={categoryToggleHandler} />
			<ProductList products={filteredProducts} />
			{showMainButton && <Box mb="50px" />}
			{/* Go to Cart Button */}
			{showMainButton && (
				<Box w="100%" position="fixed" bottom={0} backgroundColor="lightgray">
					<Button w="100%" colorScheme="telegram" onClick={() => navigate("/cart")} size="lg">
						Go To Cart
					</Button>
				</Box>
			)}
			{/* <Box w="100%" position="fixed" bottom={0} backgroundColor="lightgray">
				<Button w="100%" colorScheme="telegram" onClick={() => navigate("/cart")} size="lg">
					Go To Cart
				</Button>
			</Box> */}
		</Box>
	);
}

export default Products;
