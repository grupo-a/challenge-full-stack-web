import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import appConfig from "src/config/app.config";

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => ({
        secret: appConfig().JWT_SECRET,
        signOptions: {
            expiresIn: '24h',
        },
    })

}