import {Route, Routes} from "react-router-dom";
import React from "react";
import {LoginPage} from "../../pages/loginPage/LoginPage";
import {ProtectedRoute} from "../../shared/components/ProtectedRoute";
import {NotFoundPage} from "../../pages/notFoundPage/NotFoundPage";
import {UsersPage} from "../../pages/usersPage/UsersPage";

export const Path = {
    login: "/",
    users: "/users",
    notFound: "*",
} as const

export const Routing = () => (
        <Routes>
            <Route path={Path.login} element={<LoginPage />} />
            <Route
                path={Path.users}
                element={
                    <ProtectedRoute>
                        <UsersPage />
                    </ProtectedRoute>
                }
            />
            <Route path={Path.notFound} element={<NotFoundPage />} />
    </Routes>
)