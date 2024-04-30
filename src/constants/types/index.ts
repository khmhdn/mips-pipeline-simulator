interface RouterRecordChild {
  path: string;
  name: string;
  icon?: string;
  faName?: string;
  component: any;
}

interface RequireAuth {
  requiresAuth: boolean;
}

export interface CustomRouterRecord {
  path: string;
  name?: string;
  component?: any;
  icon?: string;
  faName?: string;
  showSidebar?: boolean;
  hasChild?: boolean;
  dropdownOpen?: boolean;
  meta?: RequireAuth;
  children?: Array<RouterRecordChild>;
  redirect?: string;
}
