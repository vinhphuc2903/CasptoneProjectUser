import React from "react";
import * as RouterPath from './RouterPath'
import Category from "../pages/category/Category";
import Login from "../pages/login/Login";
import DetailLaptop from "../pages/DetailLaptop/DetailLaptop";
import Cart from "../pages/cart/Cart"
import AccountInfo from "../pages/account/AccountInfo";
import Admin from "../pages/admin/MyProduct/Admin"
import Payment from "../pages/payment/Payment";
import Pending from "../pages/pending/Pending";
import HomePage from "../pages/homepage/HomePage";
import DetailOrder from "../pages/detailOrder/DetailOrder";
import EditProduct from "../components/Admin/EditProduct/EditProduct";
import PageNull from "../redux/pagenull/pagenull";
import ShowTime from "../pages/showTime/ShowTime";
import DetailFilm from "../pages/detailFilm/DetailFilm";
import ListFilmPlaying from "../pages/listFilmPlaying/ListFilmPlaying";
import TicketPage from "../pages/ticketPage/TicketPage";
import CornWaterPage from "../pages/cornWaterPage/CornWaterPage";
import ConfirmPage from "../pages/confirmPage/ConfirmPage";
import OrderPage from "../pages/orderPage/OrderPage";
import BookingPage from "../pages/bookingPage/BookingPage";
import BranchPage from "../pages/branchPage/BranchPage"
import Change from "../pages/change/change";

const Routes = [
    {
      id: 'HOME',
      path: RouterPath.HOMEPAGE,
      component: <HomePage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CATEGORY',
      path: RouterPath.CATEGORY,
      component: <Category />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'LOGIN',
      path: RouterPath.LOGIN,
      component: <Login />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_LAPTOP',
      path: RouterPath.DETAIL_LAPTOP,
      component: <DetailLaptop />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CART',
      path: RouterPath.CART,
      component: <Cart />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ACCOUNTINFO',
      path: RouterPath.ACCOUNT,
      component: <AccountInfo />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ADMIN',
      path: RouterPath.ADMIN,
      component: <Admin />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PAYMENT',
      path: RouterPath.PAYMENT,
      component: <Payment />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PENDING',
      path: RouterPath.PENDING,
      component: <Pending />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_ORDER',
      path: RouterPath.DETAIL_ORDER,
      component: <DetailOrder />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EDIT_PRODUCT',
      path: RouterPath.EDIT_PRODUCT,
      component: <EditProduct />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PAGE_NULL',
      path: RouterPath.PAGE_NULL,
      component: <PageNull />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CHANGE_PASS',
      path: RouterPath.CHANGE_PASSWORD,
      component: <Change />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'SHOWTIMES',
      path: RouterPath.SHOWTIMES,
      component: <ShowTime />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_FILM',
      path: RouterPath.DETAIL_FILM,
      component: <DetailFilm />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'FILMS_PLAYING',
      path: RouterPath.FILMS_PLAYING,
      component: <ListFilmPlaying />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'TICKET_PAGE',
      path: RouterPath.TICKET_PAGE,
      component: <OrderPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    // {
    //   id: 'CORN_WATER_PAGE',
    //   path: RouterPath.CORN_WATER_PAGE,
    //   component: <CornWaterPage />,
    //   // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    // },
    {
      id: 'CONFIRM_PAGE',
      path: RouterPath.CONFIRM_PAGE,
      component: <ConfirmPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'BOOKING_PAGE',
      path: RouterPath.BOOKING_PAGE,
      component: <BookingPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'BRANCH_PAGE',
      path: RouterPath.BRANCH_PAGE,
      component: <BranchPage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
]
export default Routes
