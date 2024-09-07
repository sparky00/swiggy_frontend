import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./src/components/About";
import Error from "./src/components/Error";
import Menu from "./src/components/Menu";
import UserContext from "./src/utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./src/utils/appStore";
import Cart from "./src/components/Cart";
import Login from "./src/components/Login";
import ProtectedRoute from "./src/components/ProtectedRoute";

// AppLayout component which now also handles errors
const AppLayout = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const name = "Async Javascriptor";
        setUserName(name);
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </UserContext.Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />, // Render Error component on error
        children: [
            {
                path: "/home",
                element: (
                    <ProtectedRoute>
                        <Body />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/about",
                element: (
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/cart",
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/restaurant/:id",
                element: (
                    <ProtectedRoute>
                        <Menu />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

// Wrap the RouterProvider with the Redux Provider
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={appStore}>
        <RouterProvider router={appRouter} />
    </Provider>
);
