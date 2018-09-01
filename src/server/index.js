import path from "path";
import express from "express";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, path.join('..', 'public'))));

routes(app);

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
});
