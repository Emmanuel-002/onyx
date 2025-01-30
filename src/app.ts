import cors from 'cors';
import express, { Application } from 'express';
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';

const app: Application = express();
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const logFile = join(__dirname, "kainji-cooperative.log");


// app.use(express.json());
app.use(morgan('dev'));

app.use(cors({ origin: ['http://localhost:5173', 'https://inventory-navy.vercel.app'] }));
app.use(compression());
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(resolve(__dirname, "public/app")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('env') === 'production' ? app.set('trust proxy', 1) : ''
// app.use("/admin", session(app));
// app.use(
//   morgan(":method - :url - :date - :response-time ms", {
//     stream: createWriteStream(logFile, { flags: "a" }),
//   })
// );



// application routes
app.use('/api/v1', rootRouter);
app.get("*", (req, res) => res.sendFile(resolve(__dirname, "public", "app", "index.html")));
app.use(globalErrorHandler);

app.use(notFound);

export default app;
