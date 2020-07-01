import Home from "../page/Home";
import Error404 from "../page/Error/Error404";
import User from "../page/User";
import Users from "../page/Users";

export default [
    {
        path: "/users",
        exact: true,
        page: Users
    },
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "/:id",
        page: User,
        exact:true
    },
    {
        path: "*",
        page: Error404
    }

]