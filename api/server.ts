import next from "next";
import express from "express";
import http from "http";
import prepareDatabase from "./prepareDatabase";
import cors from "cors";
import pairRouter from "./routes/pair.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

(async () => {
    await prepareDatabase();
    await nextApp.prepare();

    const corsOptions = {
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    };

    app.use(cors(corsOptions));

    app.use(express.json({ limit: "20000kb" }));
    app.use(express.static("./public"));
    app.use("/node_modules/@mediapipe/selfie_segmentation", express.static("./node_modules/@mediapipe/selfie_segmentation"));
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        next();
    });
    app.use(
        "/api",
        [
            pairRouter,
            authRouter,
            userRouter,
        ]
    );

    app.get('*', (req, res) => handle(req, res));

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();