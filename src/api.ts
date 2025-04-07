import { Customer } from "./types";

/**
 * API Urls
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiTrainingsUrl = import.meta.env.VITE_API_TRAINING_CUSTOMER_URL;

/**
 * * Retrieve all customers
 * @returns Customers
 */
export const fetchCustomersApi = async () => {
  return fetch(`${apiBaseUrl}/customers`).then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching customers");
    }
    return response.json();
  });
};

/**
 * * Retrieve all trainings with customer informations
 * @returns The trainings with customer informations
 */
export const fetchTrainingsWithCustomer = async () => {
  return fetch(apiTrainingsUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching trainings with customers");
    }
    return response.json();
  });
};

/**
 * * Add a customer to the database
 * @param customer The customer to add
 * @returns Added customer
 */
export const addCustomerApi = async (customer: Customer) => {
  return fetch(`${apiBaseUrl}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when adding customer");
    }
    return response.json();
  });
};

/**
 * * Edit a customer
 * @param customer The customer to edit
 * @returns Edited customer
 */
export const editCustomerApi = async (customer: Customer, url: string) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when updating customer");
    }
    return response.json();
  });
};
