import { HStack, Tag, TagLabel } from "@chakra-ui/react";
import { CATEGORIES } from "../dummy";

type Props = {
	selectedCategories: string[];
	toggleSelect: (categoryName: string) => void;
};
function CategorySearch({ selectedCategories, toggleSelect }: Props) {
	return (
		<HStack width="90%" mx="auto" my={2} spacing="16px" overflowX="scroll" shouldWrapChildren>
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
		</HStack>
	);
}

export default CategorySearch;
