import { HStack, Tag, TagLabel } from "@chakra-ui/react";
import { CATEGORIES } from "../dummy";

type Props = {
	selectedCategories: string[];
	toggleSelect: (categoryName: string) => void;
};
function CategorySearch({ selectedCategories, toggleSelect }: Props) {
	return (
		<HStack width="90%" mx="auto" my={2} spacing="16px" overflowX="scroll" shouldWrapChildren>
			{/* <Flex mx="auto" mb={2}> */}
			{CATEGORIES.map((c) => (
				<Tag
					key={c}
					size="lg"
					colorScheme={selectedCategories.includes(c) ? "telegram" : "gray"}
					onClick={() => toggleSelect(c)}
				>
					<TagLabel>{c}</TagLabel>
				</Tag>
			))}
			{/* </Flex> */}
		</HStack>
	);
}

export default CategorySearch;
