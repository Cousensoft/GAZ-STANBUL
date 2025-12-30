
// Mock API Service
// In a real application, this would use axios or fetch to communicate with a backend.

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  get: async (endpoint: string) => {
    await delay(500);
    console.log(`GET request to ${endpoint}`);
    return { data: {} };
  },
  post: async (endpoint: string, data: any) => {
    await delay(800);
    console.log(`POST request to ${endpoint}`, data);
    return { data };
  },
  put: async (endpoint: string, data: any) => {
    await delay(800);
    console.log(`PUT request to ${endpoint}`, data);
    return { data };
  },
  delete: async (endpoint: string) => {
    await delay(500);
    console.log(`DELETE request to ${endpoint}`);
    return { success: true };
  }
};
