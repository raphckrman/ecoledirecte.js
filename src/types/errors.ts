export class NetworkError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}