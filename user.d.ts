import { UserDTO } from './src/user/dto'

declare global {
  namespace Express {
    export interface Request {
      user: UserDTO
    }
  }
}
