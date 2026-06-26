
// ----------------------------------------------------------------------

export const ROOT_ADMIN = '/admin';
export const ROOT_CUSTOMER = '/cus-admin';

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  CUSTOMER: '/customer',
  ADMIN: '/administrator',
  IMPORT: '/import',
  REPORT: '/report',
  MASTER_CONFIG: '/master-data',
  CUSTOMER_TEMPALTE: '/customer-template',
  MY_TASK: '/task',
  MY_DOCUMENT: '/documents',
  CONFIG_TEMPALTE: '/config-template'
};

const ROOTS_CUSTOMER = {
  CUSTOMER_TICKET: '/ticket-customer',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
  // AUTH
  auth: {
    jwt: {
      login: `/login`,
      register: `/register`,
    }
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOT_ADMIN}${ROOTS.DASHBOARD}`,
    general: {
      app: `${ROOT_ADMIN}${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOT_ADMIN}${ROOTS.DASHBOARD}/ecommerce`,
      overview: `${ROOT_ADMIN}${ROOTS.DASHBOARD}/overview`,
    },
  },
  customer: {
    root: `${ROOT_ADMIN}${ROOTS.CUSTOMER}`,
    add: `${ROOT_ADMIN}${ROOTS.CUSTOMER}/add`,
    customerTemplate: `${ROOT_ADMIN}${ROOTS.CUSTOMER_TEMPALTE}`,
    configTemplate: `${ROOT_ADMIN}${ROOTS.CONFIG_TEMPALTE}`,
  },
  admin: {
    root: `${ROOT_ADMIN}${ROOTS.ADMIN}`,
    add: `${ROOT_ADMIN}${ROOTS.ADMIN}/add`,
  },
  import: {
    root: `${ROOT_ADMIN}${ROOTS.IMPORT}`,
    etax: `${ROOT_ADMIN}${ROOTS.IMPORT}/e-tax`,
    eDocument: `${ROOT_ADMIN}${ROOTS.IMPORT}/e-document`,
  },
  report: {
    root: `${ROOT_ADMIN}${ROOTS.REPORT}`,
  },
  ticket: {
    root: `${ROOT_ADMIN}${ROOTS_CUSTOMER.CUSTOMER_TICKET}`,
    add: `${ROOT_ADMIN}${ROOTS_CUSTOMER.CUSTOMER_TICKET}/submitticket/add`,
  },
  masterData: {
    provinces: `${ROOT_ADMIN}${ROOTS.MASTER_CONFIG}/province`,
    district: `${ROOT_ADMIN}${ROOTS.MASTER_CONFIG}/district`,
    subDistrict: `${ROOT_ADMIN}${ROOTS.MASTER_CONFIG}/sub-district`,
    configGroup: `${ROOT_ADMIN}${ROOTS.MASTER_CONFIG}/config-group`
  },
  mytask: {
    root: `${ROOT_ADMIN}${ROOTS.MY_TASK}`,
    accounting: `${ROOT_ADMIN}${ROOTS.MY_TASK}/accounting`,
    preview: `${ROOT_ADMIN}${ROOTS.MY_TASK}/accounting/preview`,
  },
  documents: {
    root: `${ROOT_ADMIN}${ROOTS.MY_DOCUMENT}`,
  },
  event: {
    details: (eventUrl: string) => `event/${eventUrl}`,
  },
  order: {
    root: `/order`,
    details: (orderNumber: string) => `/order/${orderNumber}`
  },
  orderVr: {
    root: `/virtual-run-order`,
  },
  orderVirtualRun: {
    root: `/virtual-run`,
    details: (orderNumber: string) => `/virtual-run/${orderNumber}`
  },
};

export const pathsCustomer = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
  // AUTH
  auth: {
    jwt: {
      login: `/login`,
      register: `/register`,
    }
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOT_CUSTOMER}${ROOTS.DASHBOARD}`,
    general: {
      app: `${ROOT_CUSTOMER}${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOT_CUSTOMER}${ROOTS.DASHBOARD}/ecommerce`,
      customer: `${ROOT_CUSTOMER}${ROOTS.DASHBOARD}/customer`,
    },
  },
  ticket: {
    root: `${ROOT_CUSTOMER}${ROOTS_CUSTOMER.CUSTOMER_TICKET}`,
    add: `${ROOT_CUSTOMER}${ROOTS_CUSTOMER.CUSTOMER_TICKET}/submitticket/add`,
  },
  import: {
    root: `${ROOT_CUSTOMER}${ROOTS.IMPORT}`,
    etax: `${ROOT_CUSTOMER}${ROOTS.IMPORT}/e-tax`,
    eDocument: `${ROOT_CUSTOMER}${ROOTS.IMPORT}/e-document`,
  },
  report: {
    root: `${ROOT_CUSTOMER}${ROOTS.REPORT}`,
  },
  mytask: {
    root: `${ROOT_CUSTOMER}${ROOTS.MY_TASK}`,
    accounting: `${ROOT_CUSTOMER}${ROOTS.MY_TASK}/accounting`,
    preview: `${ROOT_CUSTOMER}${ROOTS.MY_TASK}/accounting-preview`,

  },
  documents: {
    root: `${ROOT_CUSTOMER}${ROOTS.MY_DOCUMENT}`,
  }
};