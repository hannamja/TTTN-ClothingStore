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
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Purchase from "./pages/Purchase/Purchase";
import Export from "./pages/Export/Export";
import ExportVoucherTabs from "./pages/ExportVoucherTabs/ExportVoucherTabs";
import UserTabs from "./pages/UserTabs/UserTabs";
import User from "./pages/User/User";
import OrderBillTabs from "./pages/OrderBillTabs/OrderBillTabs";
import OrderVoucherTabs from "./pages/OrderVoucherTabs/OrderVoucherTabs";
import OrderVoucher from "./pages/OrderVoucher/OrderVoucher";

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
        path: '/admin/orderBill',
        element: <OrderBillTabs />
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
        path: '/admin/orderManagement',
        element: <OrderVoucherTabs />
      },
      {
        path: '/admin/orderManagement/add',
        element: <OrderVoucher />
      },
      {
        path: '/admin/orderManagement/detailOrder/:id',
        element: <OrderVoucher />
      },
      {
        path: '/admin/orderManagement/modifyOrder/:id',
        element: <OrderVoucher />
      },

      {
        path: '/admin/exportManagement',
        element: <ExportVoucherTabs />
      },
      {
        path: '/admin/exportManagement/add',
        element: <Export />
      },
      {
        path: '/admin/exportManagement/detailExport/:id',
        element: <Export />
      },
      {
        path: '/admin/exportManagement/modifyExport/:id',
        element: <Export />
      },
      {
        path: '/admin/userManagement',
        element: <UserTabs />
      },
      {
        path: '/admin/userManagement/add',
        element: <User />
      },
      {
        path: '/admin/userManagement/detailExport/:id',
        element: <User />
      },
      {
        path: '/admin/userManagement/modifyExport/:id',
        element: <User />
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
  },
  {
    path: '/user/purchase',
    element: <UserLayout />,
    children: [
      {
        path: '/user/purchase',
        element: <Purchase />
      },
      {
        path: '/user/purchase/order',
        element: <OrderDetails />
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
