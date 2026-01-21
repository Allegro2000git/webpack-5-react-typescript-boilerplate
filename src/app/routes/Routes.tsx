import {Route, Routes} from "react-router-dom";
import {Auth} from "../../features/auth/ui/Auth";
import React from "react";
import {PageNotFound} from "../../features/notFound/PageNotFound";
import {UserList} from "../../features/users/UserList";

export const Path = {
    login: "/",
    users: "/users",
    notFound: "*",
} as const

export const Routing = () => (
        <Routes>
            <Route path={Path.login} element={<Auth />} />
            <Route path={Path.users} element={<UserList />} />
            <Route path={Path.notFound} element={<PageNotFound />} />
    </Routes>
)