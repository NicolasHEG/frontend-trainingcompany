/**
 * API Urls
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiTrainingsUrl = import.meta.env.VITE_API_TRAINING_CUSTOMER_URL;

/**
 * 
 * @returns Customers
 */
export const fetchCustomersApi = async () => {
  return fetch(`${apiBaseUrl}/customers`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching customers");
    }
    return response.json();
  });
};

/**
 * @returns The trainings with customer informations
 */
export const fetchTrainingsWithCustomer = async () => {
  return fetch(apiTrainingsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error when fetching trainings with customers");
    }
    return response.json();
  });
};
