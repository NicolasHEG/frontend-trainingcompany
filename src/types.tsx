export type Training = {
    date: string;
    duration: number;
    activity: string;
    customer: string;
};

export type Customer = Omit<CustomerFullData, "_links">;

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