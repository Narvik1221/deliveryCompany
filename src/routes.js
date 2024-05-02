
import { MAIN_ROUTE,AUTH_ROUTE, LOGIN_ROUTE,CABINET_ROUTE,ADMIN_ROUTE} from "./utils/consts";
import MAIN from "./pages/Main";
import Auth from "./pages/Auth";
import Cabinet from "./pages/Cabinet";
import Admin from "./pages/Admin";
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
    {
        path: CABINET_ROUTE,
        Component: Cabinet
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

]
