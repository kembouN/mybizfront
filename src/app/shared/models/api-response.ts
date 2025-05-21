
export interface ApiResponse<T>{
  status: number,
  message: string,
  content: T
};
