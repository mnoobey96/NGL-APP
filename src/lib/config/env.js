import {z} from 'zod';
import {config} from "dotenv";
config();
const schema = z.object({
    port: z.string().default('3000'),
    MONGODB_URL:z.string(),
    JWT_SECRET:z.string(),
    MAIL_USER:z.string().trim().lowercase(),
    MAIL_PASS:z.string(),
    GOOGLE_OAUTH_CLIENT_ID:z.string(),
    REDIS_PORT:z.string().default('6379'),
    REDIS_HOST:z.string(),
    REDIS_PASSWORD:z.string(),

});

const parsed =schema.parse(process.env);

export const env={
    port:Number(parsed.port),
    google:{
        webClientId:parsed.GOOGLE_OAUTH_CLIENT_ID,
    },
    db:{
        url:parsed.MONGODB_URL,
    },
    redis:{
        host: parsed.REDIS_HOST,
        port: Number (parsed.REDIS_PORT),
        password:parsed.REDIS_PASSWORD,
    },
    nodemailer:{
        user:parsed.MAIL_USER,
        password:parsed.MAIL_PASS,
    },
    jwt:{
        secret:parsed.JWT_SECRET,
    },


}