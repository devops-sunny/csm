import BookingsIcon from '@assets/icons/app-side-bar/bookings-icon.svg';
import DashboardIcon from '@assets/icons/app-side-bar/dash-board-icon.svg';
import EducationCenterIcon from '@assets/icons/app-side-bar/education-icon.svg';
import EmployeesIcon from '@assets/icons/app-side-bar/employees-icon.svg';
import GalleryIcon from '@assets/icons/app-side-bar/gallery-icon.svg';
import ManagersLogIcon from '@assets/icons/app-side-bar/managers-log-icon.svg';
import OrganizationIcon from '@assets/icons/app-side-bar/organization-icon.svg';
import PurchaseCalculatorIcon from '@assets/icons/app-side-bar/purchase-calculator-icon.svg';
import RecipesIcon from '@assets/icons/app-side-bar/recipes-icon.svg';
import SalesDataIcon from '@assets/icons/app-side-bar/sales-data-icon.svg';
import ScheduleIcon from '@assets/icons/app-side-bar/schedule-icon.svg';
import TaskManagementIcon from '@assets/icons/app-side-bar/task-management-icon.svg';
import { AppRoute } from '@shared/constants/app-route';
import type { AppNavItem } from '@shared/types/common';

export const APP_SIDE_NAV_WIDTH = 230;

export const APP_SIDE_NAVS: AppNavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: AppRoute.Dashboard,
    icon: DashboardIcon,
    disabled: false,
  },
  {
    id: 'employees',
    title: 'Employees',
    path: AppRoute.Employees,
    icon: EmployeesIcon,
    disabled: false,
  },
  {
    id: 'organization',
    title: 'Organization',
    path: AppRoute.Organization,
    icon: OrganizationIcon,
    disabled: true,
  },
  {
    id: 'education-center',
    title: 'EducationCenter',
    path: AppRoute.EducationCenter,
    icon: EducationCenterIcon,
    disabled: true,
  },
  {
    id: 'bookings',
    title: 'Bookings',
    path: AppRoute.Bookings,
    icon: BookingsIcon,
    disabled: true,
  },
  {
    id: 'schedule',
    title: 'Schedule',
    path: AppRoute.Schedule,
    icon: ScheduleIcon,
    disabled: true,
  },
  {
    id: 'recipes',
    title: 'Recipes',
    path: AppRoute.Recipes,
    icon: RecipesIcon,
    disabled: true,
  },
  {
    id: 'managers-log',
    title: 'Manager’s Log',
    path: AppRoute.ManagersLog,
    icon: ManagersLogIcon,
    disabled: false,
  },
  {
    id: 'gallery',
    title: 'Gallery',
    path: AppRoute.Gallery,
    icon: GalleryIcon,
    disabled: false,
  },
  {
    id: 'task-management',
    title: 'Task Management',
    path: AppRoute.TaskManagement,
    icon: TaskManagementIcon,
    disabled: true,
  },
  {
    id: 'purchase-calculator',
    title: 'Purchase Calculator',
    path: AppRoute.PurchaseCalculator,
    icon: PurchaseCalculatorIcon,
    disabled: true,
  },
  {
    id: 'sales-data',
    title: 'Sales Data',
    path: AppRoute.SalesData,
    icon: SalesDataIcon,
    disabled: true,
  },
];
