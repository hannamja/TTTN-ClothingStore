import { Children, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./app.scss"
import AdminSideBar from "./components/AdminSideBar/AdminSideBar";
import WarehouseTabs from "./pages/WarehouseTabs/WarehouseTabs";
import UserSideBar from "./components/UserSideBar/UserSideBar";
import UserInfo from "./components/UserInfo/UserInfo";
import ImportVoucherTabs from "./pages/ImportVoucherTabs/ImportVoucherTabs";
import EmployeeTabs from "./pages/EmployeeTabs/EmployeeTabs";
import ChartTabs from "./pages/ChartTabs/ChartTabs";
import Clothes from "./pages/Clothes/Clothes";
import Import from "./pages/Import/Import";
import Employee from "./pages/Employee/Employee";
import SignUp from "./pages/Signup/SignUp";
import SignInSide from "./pages/Signin/SignInSide";
import Forgot from "./pages/Forgot/Forgot";

const Layout = () => {
  return (
    <div className="app">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
const AdminLayout = () => {
  return (
    <div className="appAdmin">
      <Outlet />
      <AdminSideBar />
    </div>
  );
};

const UserLayout = () => {
  return (
    <div className="appUser">
      <Outlet />
      <UserSideBar />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/signin",
        element: <SignInSide />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forgot",
        element: <Forgot />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <WarehouseTabs />
      },
      {
        path: '/admin/addClothes',
        element: <Clothes />
      },
      {
        path: '/admin/detailClothes/:id',
        element: <Clothes />
      },
      {
        path: '/admin/modifyClothes/:id',
        element: <Clothes />
      },
      {
        path: '/admin/importManagement',
        element: <ImportVoucherTabs />
      },
      {
        path: '/admin/importManagement/add',
        element: <Import />
      },
      {
        path: '/admin/importManagement/detailImport/:id',
        element: <Import />
      },
      {
        path: '/admin/importManagement/modifyImport/:id',
        element: <Import />
      },
      {
        path: '/admin/empManagement',
        element: <EmployeeTabs />
      },
      {
        path: '/admin/empManagement/add',
        element: <Employee />
      },
      {
        path: '/admin/empManagement/detailManagement/:id',
        element: <Employee />
      },
      {
        path: '/admin/empManagement/modifyManagement/:id',
        element: <Employee />
      },
      {
        path: '/admin/reports',
        element: <ChartTabs />
      }
    ]
  },
  {
    path: '/user/setting',
    element: <UserLayout />,
    children: [
      {
        path: '/user/setting',
        element: <UserInfo />
      }
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
