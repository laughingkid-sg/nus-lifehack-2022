import moment from "moment";

const generateDates = () => {
	const firstCollectionDate = moment().add(3, "days");

	const options: string[] = [];
	for (let i = 0; i < 5; i++) {
		const dateStr = firstCollectionDate.clone().add(i, "days").format("DD MMM");
		options.push(dateStr.concat(" Morning (9am-12pm)"));
		options.push(dateStr.concat(" Afternoon (1pm-5pm)"));
	}

	return options;
};

export { generateDates };
