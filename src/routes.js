
import { MAIN_ROUTE,AUTH_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import MAIN from "./pages/Main";
import Auth from "./pages/Auth";
export const authRoutes = [

]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MAIN
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

]
