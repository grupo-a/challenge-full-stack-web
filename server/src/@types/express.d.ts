/* eslint-disable @typescript-eslint/naming-convention */
import { ITokenPayload } from '../adapters/user/user-login-dto.interface'

declare global {
    namespace Express {
        interface Request {
            user: ITokenPayload
        }
    }
}
