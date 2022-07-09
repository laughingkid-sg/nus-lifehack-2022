import { createContext, ReactNode, useState } from "react";
import { Product } from "../types/Product";
import { generateDates } from "../utils/CollectionDates";

interface ContextProps {
	products: Product[];
	categories: string[];
	dateOptions: string[];
	initShop: (products: Product[], categories: string[]) => void;
}

interface ProviderProps {
	children: ReactNode;
}

export const AppContext = createContext({} as ContextProps);

const AppContextProvider = ({ children }: ProviderProps) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [dateOptions, setDateOptions] = useState<string[]>([]);

	const initShop = (products: Product[], categories: string[]) => {
		setProducts(products);
		setCategories(categories);
		setDateOptions(generateDates());
	};

	return (
		<AppContext.Provider value={{ products, categories, dateOptions, initShop }}>{children}</AppContext.Provider>
	);
};

export default AppContextProvider;
