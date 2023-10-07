import { Children, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
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
import Brand from "./pages/Brand/Brand";
import Type from "./pages/Type/Type";
import Material from "./pages/Material/Material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/userReducer";
import jwt_decode from "jwt-decode";
import { Alert, Snackbar } from "@mui/material";

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



function App() {
  const user = useSelector(state => state.user)

  const visitorRoutes = createBrowserRouter([
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
          element: Object.keys(user).length === 0 ? <SignInSide /> : <Navigate to='/' />,
        },
        {
          path: "/signup",
          element: Object.keys(user).length === 0 ? <SignUp /> : <Navigate to='/' />,
        },
        {
          path: "/forgot",
          element: <Forgot />,
        },
        {
          path: "/search/:q",
          element: <SearchResult />,
        },
      ],
    },
  ])
  const userRoutes = createBrowserRouter([
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
          element: Object.keys(user).length === 0 ? <SignInSide /> : <Navigate to='/' />,
        },
        {
          path: "/signup",
          element: Object.keys(user).length === 0 ? <SignUp /> : <Navigate to='/' />,
        },
        {
          path: "/forgot",
          element: <Forgot />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/search/:q",
          element: <SearchResult />,
        },
      ],
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
          path: '/user/purchase/order/:id',
          element: <OrderDetails />
        }
      ]
    }
  ])
  const adminRoutes = createBrowserRouter([
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
          element: Object.keys(user).length === 0 ? <SignInSide /> : <Navigate to='/' />,
        },
        {
          path: "/signup",
          element: Object.keys(user).length === 0 ? <SignUp /> : <Navigate to='/' />,
        },
        {
          path: "/forgot",
          element: <Forgot />,
        },
        {
          path: "/search/:q",
          element: <SearchResult />,
        },
      ],
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
          element: <Clothes type='add' />
        },
        {
          path: '/admin/detailClothes/:id',
          element: <Clothes type='detail' />
        },
        {
          path: '/admin/modifyClothes/:id',
          element: <Clothes type='mod' />
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
          element: <Import type='add' />
        },
        {
          path: '/admin/importManagement/detailImport/:id',
          element: <Import type='detail' />
        },
        {
          path: '/admin/importManagement/modifyImport/:id',
          element: <Import type='mod' />
        },
        // quản lí đặt
        {
          path: '/admin/orderManagement',
          element: <OrderVoucherTabs />
        },
        {
          path: '/admin/orderManagement/add',
          element: <OrderVoucher type='add' />
        },
        {
          path: '/admin/orderManagement/detailOrder/:id',
          element: <OrderVoucher type='detail' />
        },
        {
          path: '/admin/orderManagement/modifyOrder/:id',
          element: <OrderVoucher type='mod' />
        },
        // quản lí xuất
        {
          path: '/admin/exportManagement',
          element: <ExportVoucherTabs />
        },
        {
          path: '/admin/exportManagement/add',
          element: <Export type='add' />
        },
        {
          path: '/admin/exportManagement/detailExport/:id',
          element: <Export type='detail' />
        },
        {
          path: '/admin/exportManagement/modifyExport/:id',
          element: <Export type='mod' />
        },

        // quản lí khách
        {
          path: '/admin/userManagement',
          element: <UserTabs />
        },
        {
          path: '/admin/userManagement/add',
          element: <User type='add' />
        },
        {
          path: '/admin/userManagement/detailUser/:id',
          element: <User type='detail' />
        },
        {
          path: '/admin/userManagement/modifyUser/:id',
          element: <User type='mod' />
        },
        //quản lí nhân viên
        {
          path: '/admin/empManagement',
          element: <EmployeeTabs />
        },
        {
          path: '/admin/empManagement/add',
          element: <Employee type='add' />
        },
        {
          path: '/admin/empManagement/detailEmp/:id',
          element: <Employee type='detail' />
        },
        {
          path: '/admin/empManagement/modifyEmp/:id',
          element: <Employee type='mod' />
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
          element: <Provider type='add' />
        },
        {
          path: '/admin/providerManagement/modifyProvider/:id',
          element: <Provider type='mod' />
        },
        {
          path: '/admin/providerManagement/detailProvider/:id',
          element: <Provider type='detail' />
        },
        // quản lí role
        {
          path: '/admin/roleManagement',
          element: <RoleTabs />
        },
        {
          path: '/admin/roleManagement/add',
          element: <Role type='add' />
        },
        {
          path: '/admin/roleManagement/modifyRole/:id',
          element: <Role type='mod' />
        },
        {
          path: '/admin/roleManagement/detailRole/:id',
          element: <Role type='detail' />
        },
        // quản lí giá
        {
          path: '/admin/priceManagement',
          element: <PriceManagementTabs />
        },
        {
          path: '/admin/priceManagement/add',
          element: <PriceManagement type='add' />
        },
        {
          path: '/admin/priceManagement/modifyPrice/:id',
          element: <PriceManagement type='mod' />
        },
        {
          path: '/admin/priceManagement/detailPrice/:id',
          element: <PriceManagement type='detail' />
        },
        // quản lí km
        {
          path: '/admin/kmManagement',
          element: <KMTabs />
        },
        {
          path: '/admin/kmManagement/add',
          element: <KM type='add' />
        },
        {
          path: '/admin/kmManagement/modifyKM/:id',
          element: <KM type='mod' />
        },
        {
          path: '/admin/kmManagement/detailKM/:id',
          element: <KM type='detail' />
        },
        // quản lí brand
        {
          path: '/admin/brandManagement/add',
          element: <Brand type='add' />
        },
        {
          path: '/admin/brandManagement/modifyBrand/:id',
          element: <Brand type='mod' />
        },
        {
          path: '/admin/brandManagement/detailBrand/:id',
          element: <Brand type='detail' />
        },
        // quản lí type
        {
          path: '/admin/typeManagement/add',
          element: <Type type='add' />
        },
        {
          path: '/admin/typeManagement/modifyType/:id',
          element: <Type type='mod' />
        },
        {
          path: '/admin/typeManagement/detailType/:id',
          element: <Type type='detail' />
        },
        // quản lí chất liệu
        {
          path: '/admin/materialManagement/add',
          element: <Material type='add' />
        },
        {
          path: '/admin/materialManagement/modifyMaterial/:id',
          element: <Material type='mod' />
        },
        {
          path: '/admin/materialManagement/detailMaterial/:id',
          element: <Material type='detail' />
        },
      ]
    }
  ])
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      let token = user.token;
      let decodedToken = jwt_decode(token);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        dispatch(logout())
      } else {
        console.log("Valid token");
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(user).length !== 0) setOpen(true)
    return () => setOpen(false)
  }, [user])
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
      <RouterProvider router={Object.keys(user).length === 0 ? visitorRoutes : user.info.role[user.info.role.length - 1] === 3 ? userRoutes : adminRoutes} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Đã đăng nhập thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
