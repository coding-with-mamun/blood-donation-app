import { createBrowserRouter } from "react-router-dom";
import { publicRoute } from "./publicRoute";
import { privateRoute } from "./privateRouter";

// create router
const router = createBrowserRouter([...publicRoute, ...privateRoute]);

// export
export default router;
