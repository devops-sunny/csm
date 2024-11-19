export enum AppRoute {
  Login = '/login',
  LogOut = '/logout',

  Registration = '/registration',

  Verification = '/verification',

  ForgotPassword = '/forgot-password',

  ResetPassword = '/reset-password',

  Error = '/_error',
  NotFound = '/404',
  Forbidden = '/forbidden',

  TermsOfUse = '/terms-of-use',
  PrivacyPolicy = '/privacy-policy',
  ContactUs = '/contact-us',

  Home = '/',

  OfflineFallback = '/offline',

  Dashboard = '/dashboard',
  Employees = '/employees',
  Organization = '/organization',
  EducationCenter = '/education-center',
  Bookings = '/bookings',
  Schedule = '/schedule',
  Recipes = '/recipes',
  ManagersLog = '/managers-log',
  ManagersLogDetail = '/managers-log/[logId]',
  ManagersLogSettings = '/managers-log/settings',
  Gallery = '/gallery',
  TaskManagement = '/task-management',
  PurchaseCalculator = '/purchase-calculator',
  SalesData = '/sales-data',
}
