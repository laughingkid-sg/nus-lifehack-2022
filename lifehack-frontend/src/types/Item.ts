export type Item = {
	id: string;
	name: string;
	description: string;
	productImg: string[];
	category: "Paper" | "Plastic" | "Glass" | "Metal" | "Electronics";
	points: number;
};
