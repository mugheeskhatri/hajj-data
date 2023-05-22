import { lazy } from "react";
import DataForm from "../pages//HajjFormCreate";
import EditData from "../pages/EditData";
import HajjGroupCreate from "../pages/groups/HajjGroupCreate";
import HajjGroupData from "../pages/groups/HajjGroupData";
import HajjGroupEdit from "../pages/groups/HajjGroupEdit";
import HajjData from "../pages/HajjData";
// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const category = lazy(() => import("../pages/Category"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/add-data",
    component: DataForm,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/category",
    component: category,
  },
  {
    path: "/hajj-data",
    component: HajjData,
  },
  {
    path: "/hajj-data/edit/:id",
    component: EditData,
  },
  {
    path: "/create-group",
    component: HajjGroupCreate,
  },
  {
    path: "/hajj-groups",
    component: HajjGroupData,
  },
  {
    path: "/hajj-group/edit/:id",
    component: HajjGroupEdit,
  },
];

export default routes;
