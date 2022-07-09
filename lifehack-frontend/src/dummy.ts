import { Product } from "./types/Product";

const PRODUCTS: Product[] = [
	{
		id: "c2e0f86e-6594-467e-b703-94832042036a",
		name: "General Paper Waste",
		description:
			"Below is the list of items that can be considered as general paper waste:\n- Printed paper (Glossy and non-glossy)\n- Writing paper\n- Newspaper\n- Flyer (Glossy and non-glossy)\n- Brochure (Glossy and non-glossy)\n- Magazine (Glossy and non-glossy)\n- Book / Textbook\n- Telephone directory\n- Envelope (With and without plastic window)\n- Red packet\n- Namecard\n- Calendar\n- Greeting card\n- Gift wrapping paper\n- Shredded paper\n- Paper receipt",
		productImg: ["https://newsroom.domtar.com/wp-content/uploads/2017/05/paper.jpg"],
		category: "Paper",
		points: 10,
	},
	{
		id: "dd3f1a74-6f98-4f1c-a3fb-becdb275f497",
		name: "Cardboard Waste",
		description:
			"Below is the list of items that can be considered as cardboard waste:\n- Carton box / Cardboard box\n- Paper packaging\n- Printed paper box\n- Paper Box\n- Egg tray\n- Beverage carton (e.g. milk, juice and drink packet)\n- Paper towel and toilet roll tube",
		productImg: ["https://4.imimg.com/data4/NS/CJ/MY-6512015/cardboard-waste-recycling-500x500.jpg"],
		category: "Paper",
		points: 15,
	},
	{
		id: "f9467bba-17c1-4021-a7c0-98e747817c5a",
		name: "Plastic bottles/containers",
		description:
			"Please empty and rinse the bottles before sending it to the collection point. Some examples are:- Water bottles\n- Milk bottles\n- Shampoo bottles\n- Facial cleansers",
		productImg: [
			"http://cdn.shopify.com/s/files/1/0213/9160/5824/articles/1_plastic_bottles_1200x1200.jpg?v=1579268178",
		],
		category: "Plastic",
		points: 20,
	},
	{
		id: "669ac813-4211-43a6-ae15-4b8d5f9d364f",
		name: "General Plastic Waste",
		description:
			"Below are the items that can be considered as general plastic waste:\n- Plastic bags\n- Tissue box packaging\n- Plastic packaging film (e.g. magazine wrappers)\n-Plastic clothes hanger",
		productImg: ["https://global.videojet.com/wp-content/uploads/dam/img/glossary-images/10-packaging-types.png"],
		category: "Plastic",
		points: 25,
	},
];

const CATEGORIES = ["Paper", "Plastic", "Glass", "Metal", "Electronics"];

export { CATEGORIES, PRODUCTS };
