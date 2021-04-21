export class APIError extends Error {
  constructor(message: string, status: number) {
    super(message);

    Object.setPrototypeOf(this, APIError.prototype);
    this.message = message;
    this.status = status;
  }

  public message: string;
  public status: number;
}
