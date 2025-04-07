import { Customer, TrainingAdd } from "./types";

/**
 * API Urls
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiTrainingsWithCustomerUrl = import.meta.env.VITE_API_TRAINING_CUSTOMER_URL;

/**
 * * Retrieve all customers
 * @returns Customers
 */
export const fetchCustomersApi = () => {
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
export const fetchTrainingsWithCustomer = () => {
  return fetch(apiTrainingsWithCustomerUrl).then((response) => {
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
export const addCustomerApi = (customer: Customer) => {
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
export const editCustomerApi = (customer: Customer, url: string) => {
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

/**
 * * Delete a customer
 * @param url The url of the customer to delete
 * @returns Deleted customer
 */
export const deleteCustomerApi = (url: string) => {
  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when deleting customer");
    }
    return response.json();
  });
};


/**
 * * Add a training for a customer
 * @param training The training to add
 * @returns Added training
 */
export const addTrainingApi = (training: TrainingAdd) => {
  return fetch(`${apiBaseUrl}/trainings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(training),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when adding training");
    }
    return response.json();
  });
};

/**
 * * Delete a training by its id
 * @param url The url of the training to delete
 * @returns Deleted training
 */
export const deleteTrainingApi = (id: number) => {
  return fetch(`${apiBaseUrl}/trainings/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error when deleting training");
    }
    return response.json();
  });
}