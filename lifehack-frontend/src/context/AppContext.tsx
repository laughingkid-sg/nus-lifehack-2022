import { createContext, ReactNode, useState } from "react";
import { Item } from "../types/Item";
import { generateDates } from "../utils/CollectionDates";

interface ContextProps {
	products: Item[];
	categories: string[];
	dateOptions: string[];
	initShop: (products: Item[], categories: string[]) => void;
}

interface ProviderProps {
	children: ReactNode;
}

export const AppContext = createContext({} as ContextProps);

const AppContextProvider = ({ children }: ProviderProps) => {
	const [products, setProducts] = useState<Item[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [dateOptions, setDateOptions] = useState<string[]>([]);

	const initShop = (products: Item[], categories: string[]) => {
		setProducts(products);
		setCategories(categories);
		setDateOptions(generateDates());
	};

	return (
		<AppContext.Provider value={{ products, categories, dateOptions, initShop }}>{children}</AppContext.Provider>
	);
};

export default AppContextProvider;
