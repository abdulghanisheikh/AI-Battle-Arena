import app from "./src/app.js";
import appConfig from "./src/configs/config.js";

app.listen(appConfig.PORT, () => {
    console.log(`server on ${appConfig.PORT}`);
});