import { authRoutes } from "../features";
import { sharingRoutes } from "../features";
import { invoicingRoutes } from "../features/invoicing";

export const publicRoutes = [
  ...authRoutes,
  ...sharingRoutes,
  ...invoicingRoutes,
];
