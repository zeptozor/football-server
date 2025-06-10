export class ApiError {
  status: number
  message: string

  constructor(status: number, message: string) {
    this.status = status
    this.message = message
  }

  static Unauthorized() {
    return new ApiError(401, 'You are unauthorized')
  }

  static BadRequest(message: string) {
    return new ApiError(400, message)
  }
}
