import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
	keyword: string;
	updateKeyword: (keyword: string) => void;
};

function SearchBar({ keyword, updateKeyword }: Props) {
	const [search, setSearch] = useState<string>(keyword);

	useEffect(() => {
		const timer = setTimeout(() => updateKeyword(search), 500);

		return () => {
			clearTimeout(timer);
		};
	}, [search]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<InputGroup w="90%" mx="auto" pt={4}>
			<InputRightElement pointerEvents="none" fontSize="1.5em" pt={9}>
				<FaSearch />
			</InputRightElement>
			<Input
				placeholder="Search for products here"
				size="lg"
				onChange={inputChangeHandler}
				backgroundColor="white"
			/>
		</InputGroup>
	);
}

export default SearchBar;
