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
import Checkout from "./components/Checkout/Checkout";
import Provider from "./pages/Provider/Provider";
import ProviderTabs from "./pages/ProviderTabs/ProviderTabs";
import RoleTabs from "./pages/RoleTabs/RoleTabs";
import Role from "./pages/Role/Role";
import PriceManagementTabs from "./pages/PriceManagementTabs/PriceManagementTabs";
import PriceManagement from "./pages/PriceManagement/PriceManagement";
import KMTabs from "./pages/KMTabs/KMTabs";
import KM from "./pages/KM/KM";
import SearchResult from "./pages/SearchResult/SearchResult";

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
  // user usecase
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
        path: "/products/search",
        element: <SearchResult />,
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
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },

  //admin usecase
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      // quản lí kho
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
      //quản lí đơn khách
      {
        path: '/admin/orderBill',
        element: <OrderBillTabs />
      },
      // quản lí nhập
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
      // quản lí đặt
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
      // quản lí xuất
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

      // quản lí khách
      {
        path: '/admin/userManagement',
        element: <UserTabs />
      },
      {
        path: '/admin/userManagement/add',
        element: <User />
      },
      {
        path: '/admin/userManagement/detailUser/:id',
        element: <User />
      },
      {
        path: '/admin/userManagement/modifyUser/:id',
        element: <User />
      },
      //quản lí nhân viên
      {
        path: '/admin/empManagement',
        element: <EmployeeTabs />
      },
      {
        path: '/admin/empManagement/add',
        element: <Employee />
      },
      {
        path: '/admin/empManagement/detailEmp/:id',
        element: <Employee />
      },
      {
        path: '/admin/empManagement/modifyEmp/:id',
        element: <Employee />
      },
      // thống kê
      {
        path: '/admin/reports',
        element: <ChartTabs />
      },
      // quản lí nhà cung cấp
      {
        path: '/admin/providerManagement',
        element: <ProviderTabs />
      },
      {
        path: '/admin/providerManagement/add',
        element: <Provider />
      },
      {
        path: '/admin/providerManagement/modifyProvider/:id',
        element: <Provider />
      },
      {
        path: '/admin/providerManagement/detailProvider/:id',
        element: <Provider />
      },
      // quản lí role
      {
        path: '/admin/roleManagement',
        element: <RoleTabs />
      },
      {
        path: '/admin/roleManagement/add',
        element: <Role />
      },
      {
        path: '/admin/roleManagement/modifyRole/:id',
        element: <Role />
      },
      {
        path: '/admin/roleManagement/detailRole/:id',
        element: <Role />
      },
      // quản lí giá
      {
        path: '/admin/priceManagement',
        element: <PriceManagementTabs />
      },
      {
        path: '/admin/priceManagement/add',
        element: <PriceManagement />
      },
      {
        path: '/admin/priceManagement/modifyPrice/:id',
        element: <PriceManagement />
      },
      {
        path: '/admin/priceManagement/detailPrice/:id',
        element: <PriceManagement />
      },
      // quản lí km
      {
        path: '/admin/kmManagement',
        element: <KMTabs />
      },
      {
        path: '/admin/kmManagement/add',
        element: <KM />
      },
      {
        path: '/admin/kmManagement/modifyKM/:id',
        element: <KM />
      },
      {
        path: '/admin/kmManagement/detailKM/:id',
        element: <KM />
      },
    ]
  },
  // chỉnh sửa thông tin user
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
  // quản lí đơn
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
