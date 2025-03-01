export default class ApiService<T> {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async fetchData(endpoint: string, params: Record<string, string>): Promise<T> {
      const query = new URLSearchParams(params).toString();
      const url = `${this.baseUrl}/${endpoint}?${query}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  }
  