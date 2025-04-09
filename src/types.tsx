/**
 * Type used when retrieving a training with customer information
 * @param customer Concatenated firstname and lastname of the customer
 */
export type Training = {
	id: number;
	date: string;
	duration: number;
	activity: string;
	customer: string;
};

/**
 * Type used to add a training
 * @param customer Customer URL
 */
export type TrainingAdd = {
	date: string;
	duration: string;
	activity: string;
	customer: string;
}

export type Customer = Omit<CustomerFullData, "_links">;

/**
 * Complete customer data type
 */
export type CustomerFullData = {
	firstname: string;
	lastname: string;
	streetaddress: string;
	postcode: string;
	city: string;
	email: string;
	phone: string;
	_links: {
		self: { href: string };
		customer: { href: string };
		trainings: { href: string };
	};

}