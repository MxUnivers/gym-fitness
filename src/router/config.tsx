import type { RouteObject } from "react-router-dom";
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const MultisitesPage = lazy(() => import('../pages/admin/multisites/page'));
const MembersPage = lazy(() => import('../pages/admin/members/page'));
const PaymentsPage = lazy(() => import('../pages/admin/payments/page'));
const SubscriptionsPage = lazy(() => import('../pages/admin/subscriptions/page'));
const CoursesPage = lazy(() => import('../pages/admin/courses/page'));
const CoachesPage = lazy(() => import('../pages/admin/coaches/page'));
const SportsPage = lazy(() => import('../pages/admin/sports/page'));
const ReservationsPage = lazy(() => import('../pages/admin/reservations/page'));
const CalendarPage = lazy(() => import('../pages/admin/calendar/page'));
const ClientsPage = lazy(() => import('../pages/admin/clients/page'));
const MessagesPage = lazy(() => import('../pages/admin/messages/page'));
const ShopPage = lazy(() => import('../pages/admin/shop/page'));
const OrdersPage = lazy(() => import('../pages/admin/orders/page'));
const StatisticsPage = lazy(() => import('../pages/admin/statistics/page'));
const AccountsPage = lazy(() => import('../pages/admin/accounts/page'));
const ProfilePage = lazy(() => import('../pages/admin/profile/page'));
const AdminEventsPage = lazy(() => import('../pages/admin/events/page'));
const ClientLoginPage = lazy(() => import('../pages/client/login/page'));
const ClientRegisterPage = lazy(() => import('../pages/client/register/page'));
const ClientProfilePage = lazy(() => import('../pages/client/profile/page'));
const CartPage = lazy(() => import('../pages/cart/page'));
const ReservationCartPage = lazy(() => import('../pages/reservation-cart/page'));
const CheckoutPage = lazy(() => import('../pages/checkout/page'));
const PaymentSuccessPage = lazy(() => import('../pages/payment-success/page'));
const ReservationDetailPage = lazy(() => import('../pages/reservation-detail/page'));
const BoutiquePage = lazy(() => import('../pages/boutique/page'));
const ProduitDetailPage = lazy(() => import('../pages/produit-detail/page'));
const AProposPage = lazy(() => import('../pages/a-propos/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      { path: 'multisites', element: <MultisitesPage /> },
      { path: 'members', element: <MembersPage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'subscriptions', element: <SubscriptionsPage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'coaches', element: <CoachesPage /> },
      { path: 'sports', element: <SportsPage /> },
      { path: 'reservations', element: <ReservationsPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'statistics', element: <StatisticsPage /> },
      { path: 'accounts', element: <AccountsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'events', element: <AdminEventsPage /> },
    ],
  },
  {
    path: '/client/login',
    element: <ClientLoginPage />,
  },
  {
    path: '/client/register',
    element: <ClientRegisterPage />,
  },
  {
    path: '/client/profile',
    element: <ClientProfilePage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/reservation-cart',
    element: <ReservationCartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/payment-success',
    element: <PaymentSuccessPage />,
  },
  {
    path: '/reservation/:id',
    element: <ReservationDetailPage />,
  },
  {
    path: '/boutique',
    element: <BoutiquePage />,
  },
  {
    path: '/produit/:id',
    element: <ProduitDetailPage />,
  },
  {
    path: '/a-propos',
    element: <AProposPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
