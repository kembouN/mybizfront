
export interface MessageRequest {
  message: string,
  file?: File,
  caption: string,
  fileName?: string,
  receivers: number[]
}
