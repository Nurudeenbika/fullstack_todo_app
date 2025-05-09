interface ApiResponseData<T> {
    data: T | null;
    message: string;
    success: boolean;
  }
  
  export class ApiResponse<T> implements ApiResponseData<T> {
    data: T | null;
    message: string;
    success: boolean;
  
    constructor(data: T | null, message: string, success: boolean) {
      this.data = data;
      this.message = message;
      this.success = success;
    }
  }