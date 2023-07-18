/* eslint-disable no-restricted-syntax */
import moment from 'moment';

export default class Constants {
  static DEMO = 'demo';

  static PAGE_LIMIT = {
    ALL: 10,
  };

  static REGEX = {
    formatMoney: /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    isNumber: /^\d+$/,
    isOnlyDecimals: /^\.\d+/, // ex: .1
  };

  static SIZE_PRINT = {
    a4: {
      width: '210mm',
      height: '297mm',
    },
    k80: {
      width: '80mm',
      height: 'auto',
    },
    k110: {
      width: '110mm',
    },
  };

  static STATUS_POST = {
    STATUS_APPROVE: 20,
    STATUS_WAIT_APPROVE: 10,
    STATUS_NOT_APPROVE: 30,
    STATUS_REPORT: 50,
    ALL: 0,
  };

  static RECEIPT_PAGE = {
    PAGE_SIZE: 50,
    CURRENT_PAGE: 1,
  };

  static TEXT_POST = {
    STATUS_APPROVE: 'BÀI VIẾT ĐƯỢC PHÊ DUYỆT',
    STATUS_WAIT_APPROVE: 'CHỜ XÉT DUYỆT',
    STATUS_NOT_APPROVE: 'BÀI VIẾT KHÔNG ĐƯỢC PHÊ DUYỆT',
    STATUS_REPORT: 'BÀI VIẾT BỊ BÁO CÁO',
    ALL: 'TẤT CẢ',
  };

  static TEXT_POST_TYPE = {
    STATUS_APPROVE: ' ĐÃ PHÊ DUYỆT',
    STATUS_WAIT_APPROVE: 'CHỜ XÉT DUYỆT',
    STATUS_NOT_APPROVE: ' KHÔNG ĐƯỢC PHÊ DUYỆT',
    STATUS_REPORT: ' BỊ BÁO CÁO',
    ALL: 'TẤT CẢ',
  };

  static PRODUCT_LIST_PAGINATION = {
    LIMIT: 10,
    OFFSET: 1,
  };

  static ROUTER_URL = {
    PAGE: 'page',
    CUSTOMER_ID: 'cm',
    USERNAME: 'u',
    TYPE: 't',
    OFFSET: 'offset',
    DATE: 'd',
    SEARCH_ALL: 's',
    TIME_FROM: 'tf',
    TIME_TO: 'tt',
    TAB: 'tab',
    TAB_CHILD: 'tab_c',
    TYPE_SEARCH: 'ts',
    TAB_REPORT: 'tab-r',
    CODE: 'code',
  };

  static STATUS_COMMENT = {
    STATUS_REPORT: '3',
    HIDDEN: '2',
    SHOW: '1',
    ALL: '0',
  };

  static TITLE_POPUP = {
    DELETE_POST: 'Bạn có chắc chắn muốn xoá bài viết này',
    APPROVE_NOT_POST: 'Lý do không duyệt bài viết',
    DELETE_COMMENT: 'Bạn có chắc chắn muốn xoá bình luận này',
    APPROVE_POST: 'Bạn có chắc chắn phê duyệt bài viết này',
  };

  static TEXT_COMMENT = {
    STATUS_HIDDEN_COMMENT: 'BỊ ẨN',
    // STATUS_SHOW_COMMENT: 'BÌNH LUẬN HIỆN',
    ALL: 'TẤT CẢ',
    STATUS_REPORT: 'BỊ BÁO CÁO',
  };

  static TYPE_RENDER_TABLE = {
    DATE: 'DATE',
    TEXT: 'TEXT',
    CHOOSE: 'CHOOSE',
    OPTION: 'OPTION',
  };

  static STATUS_POST_DETAIL = {
    COMMENT: '1',
    INFO: '0',
  };

  static TEXT_POST_DETAIL = {
    COMMENT: 'QUẢN LÝ BÌNH LUẬN',
    INFO: 'THÔNG TIN CHUNG',
  };

  static FILTER_NUMBER_POST = {
    COMMENT: 7,
    REACTION: 8,
    SHARE: 9,
    VIEW: 10,
    HIDDEN: 11,
  };

  static CONVERT_FILTER_NUMBER_POST = {
    NumberComment: 3,
    NumberReaction: 4,
    NumberShare: 5,
    NumberView: 6,
    NumberCommentHidden: 7,
  };

  static TYPE_COMMENT_FILTER = {
    COMMENT_REPORT: 1,
  };

  static TYPE_POST_FILTER = {
    TYPE_REPORT: 1,
  };

  static STATUS_REPORT_POST = {
    NEW: '10',
    RESOLVE: '20',
    OPEN: '30',
  };

  static S003 = {
    SHOW: {
      NAME: 'Hiện',
      VALUE: '1',
    },
    HIDE: {
      NAME: 'Ẩn',
      VALUE: '2',
    },
  };

  static G001 = {
    MALE: {
      NAME: 'Nam',
      VALUE: 'M',
    },
    FEMALE: {
      NAME: 'Nữ',
      VALUE: 'F',
    },
    OTHER: {
      NAME: 'Khác',
      VALUE: 'S',
    },
  };

  static APPROVAL_TYPE = {
    SUPERVISOR: 10,
    ACCOUNTING: 20,
  };

  // Product gender
  static G002 = {
    MALE: {
      NAME: 'Nam',
      VALUE: '1',
    },
    FEMALE: {
      NAME: 'Nữ',
      VALUE: '2',
    },
    UNISEX: {
      NAME: 'Unisex',
      VALUE: '3',
    },
    COUPLE: {
      NAME: 'Đồ cặp',
      VALUE: '4',
    },
    BOY: {
      NAME: 'Bé trai',
      VALUE: '5',
    },
    GIRL: {
      NAME: 'Bé gái',
      VALUE: '6',
    },
  };

  static getClassName = (obj, val) => {
    for (const key of Object.keys(obj)) {
      if (obj[key].VALUE === val) {
        return obj[key].NAME;
      }
    }
    return '';
  };

  static FormInputFormat = {
    MONEY: {
      VALUE: 'money',
    },
    TEXT: {
      VALUE: 'text',
    },
  };

  static QueryParam = {
    Page: {
      VALUE: 'p',
    },
    Limit: {
      VALUE: 'l',
    },
    Offset: {
      VALUE: 'o',
    },
    CategoryName: {
      VALUE: 'cn',
    },
    ProductName: {
      VALUE: 'pn',
    },
    SKU: {
      VALUE: 'sku',
    },
    Status: {
      VALUE: 'st',
    },
    PriceFrom: {
      VALUE: 'pf',
    },
    PriceTo: {
      VALUE: 'pt',
    },
    Gender: {
      VALUE: 'g',
    },
    Category: {
      VALUE: 'c',
    },
    Color: {
      VALUE: 'c',
    },
    Size: {
      VALUE: 's',
    },
    Type: {
      VALUE: 't',
    },
    SearchTag: {
      VALUE: 'search',
    },
    type_Tab_Category: {
      VALUE: 'type',
    },
    CategoryParent: {
      VALUE: 'pr',
    },
    ColorName: {
      VALUE: 'clorn',
    },
    ColorCode: {
      VALUE: 'clorc',
    },
    ListProduct: {
      VALUE: 'listProduct',
    },
    Branch: {
      VALUE: 'BranchId',
    },
    DateFrom: {
      VALUE: 'From',
    },
    DateTo: {
      VALUE: 'To',
    },
    PaymentAt: {
      VALUE: 'PaymentAt',
    },
    Name: {
      VALUE: 'NameCode',
    },
  };

  static PAGINATION = {
    DEFAULT_PAGE_SIZE: 50,
  };

  static ShowPerPage = {
    VALUE: [50, 100, 500],
  };

  static CATEGORY_PANEL = {
    GENDER: {
      TEXT: 'Giới tính',
      VALUE: '0',
    },
    CATEGORY: {
      TEXT: 'Nhóm/ngành hàng',
      VALUE: '1',
    },
  };

  static SIDEBAR_MENU = {
    HOME: {
      VALUE: 'MENU23001',
      NAME: 'home',
      PARENT: '',
    },
    RECEIPT_LIST: {
      VALUE: 'MENU23002',
      NAME: 'receipt',
      PARENT: '',
    },
    RECEIPT_UPDATE: {
      VALUE: '',
      NAME: 'receipt-edit',
      PARENT: 'MENU23002',
    },
    EXPENSE_LIST: {
      VALUE: 'MENU23003',
      NAME: 'expense',
      PARENT: '',
    },
    EXPENSE_UPDATE: {
      VALUE: '',
      NAME: 'expense-edit',
      PARENT: 'MENU23003',
    },
    BONUS_LIST: {
      VALUE: 'MENU23008',
      NAME: 'bonus',
      PARENT: 'MENU23007',
    },
    BONUS_SETTING_LIST: {
      VALUE: 'MENU23009',
      NAME: 'bonus-setting',
      PARENT: 'MENU23007',
    },
    EDIT_LIMIT_TIME_LIST: {
      VALUE: 'MENU23011',
      NAME: 'limit-time',
      PARENT: 'MENU23010',
    },
  };

  static SIDEBAR = {
    HOME: 1,
    PRODUCT: 'MENU04002',
    CATEGORY: 'MENU04003',
    COLOR: 'MENU04004',
    SIZE: 'MENU04005',
    TAG: 'MENU04006',
  };

  static GROUP_BY = {
    DATE: 1,
    MONTH: 2,
  };

  static HOW_TO_ORDER = {
    POS: '1',
    WEB: '2',
    ONLINE: '3',
  };

  static MAX_SIZE_UPLOAD_FILE = {
    VIDEO: 8192,
  };

  static URL_PARAMS = {
    page: 'CurrentPage',
    offset: 'PageSize',
    search: 'Search',
    searchData: 'SearchData',
    paymentTime: 'PaymentAt',
    status: 'Status',
    code: 'Code',
    position: 'Position',
    show: 'Gender',
    type: 'Type',
    tab: 'tab',
    ctab: 'ctab',
    subTab: 'subTab',
    branch: 'BranchId',
    from: 'From',
    to: 'To',
    productKeyword: 'ProductKeyword',
    categories: 'CategoriesKeyword',
    categoriesKeyword: 'CategoryGenderId',
    MVDName: 'MVDName',
    orderKeyword: 'OrderKeyword',
    paginationConfig: 50,
    employee: 'Employee',
    supplier: 'Supplier',
    genderKeyword: 'GenderId',
    channelKeyword: 'ChannelId',
    vendor: 'VendorId',
    dateFrom: 'dateFrom',
    dateTo: 'dateTo',
    keyword: 'Keyword',
    orderedAt: 'OrderedAt',
    orderCode: 'OrderCode',
    amount: 'AmountMoney',
    accountItemCode: 'AccountItemCode',
    accountItemIds: 'AccountItemIds',
    transactionDate: 'TransactionDate',
    date: 'Date',
    createdByName: 'CreatedByName',
    createdByCode: 'CreatedByCode',
    bankAccountNumber: 'BankAccountNumber',
    employeeName: 'EmployeeName',
    employeeCode: 'EmployeeCode',
    description: 'Description',
    dateEdit: 'DateFrom',
  };

  static ACTION_STATUS = {
    10: {
      CODE: 10,
      NAME: 'Chờ duyệt',
      COLOR: '#FF8246',
      BG_SELECT: '#FF8246',
    },
    20: {
      CODE: 20,
      NAME: 'Duyệt',
      COLOR: '#008A5A',
      BG_SELECT: '#008A5A',
    },
    30: {
      CODE: 30,
      NAME: 'Không duyệt',
      COLOR: '#F05454',
      BG_SELECT: '#F05454',
    },
  };

  static BONUS_STATUS = {
    10: {
      CODE: 10,
      NAME: 'Chờ duyệt',
      COLOR: '#EDAA00',
      BG_SELECT: '#FF8246',
    },
    20: {
      CODE: 20,
      NAME: 'GS đã duyệt',
      COLOR: '#3078F1',
      BG_SELECT: '#FF8246',
    },
    21: {
      CODE: 21,
      NAME: 'GS không duyệt',
      COLOR: '#FF3434',
      BG_SELECT: '#008A5A',
    },
    30: {
      CODE: 30,
      NAME: 'Đã duyệt',
      COLOR: '#138300',
      BG_SELECT: '#0E49B5',
    },
    31: {
      CODE: 31,
      NAME: 'KT không duyệt',
      COLOR: '#FF3434',
      BG_SELECT: '#F05454',
    },
  };

  static RECEIPT_STATUS = {
    10: {
      CODE: 10,
      NAME: 'Mới',
      COLOR: '#0054E1',
      BG_SELECT: '#FF8246',
    },
    20: {
      CODE: 20,
      NAME: 'Chưa duyệt',
      COLOR: '#FF7029',
      BG_SELECT: '#FF8246',
    },
    30: {
      CODE: 30,
      NAME: 'Đã duyệt',
      COLOR: '#138300',
      BG_SELECT: '#008A5A',
    },
    40: {
      CODE: 40,
      NAME: 'Yêu cầu sửa',
      COLOR: '#0054E1',
      BG_SELECT: '#0E49B5',
    },
    50: {
      CODE: 50,
      NAME: 'Không duyệt',
      COLOR: '#FF3434',
      BG_SELECT: '#F05454',
    },
    90: {
      CODE: 90,
      NAME: 'Hủy',
      COLOR: '#EDAA00',
      BG_SELECT: '#F05454',
    },
  };

  static DEFAULT_VALUE = {
    limit: 50,
  };

  static EXPENSE_STATUS = {
    10: {
      CODE: 10,
      NAME: 'Mới',
      COLOR: '#0054E1',
    },
    20: {
      CODE: 20,
      NAME: 'Chờ duyệt',
      COLOR: '#FF7029',
    },
    30: {
      CODE: 30,
      NAME: 'Đã duyệt',
      COLOR: '#138300',
    },
    40: {
      CODE: 40,
      NAME: 'Yêu cầu điều chỉnh',
      COLOR: '#0996B5',
    },
    50: {
      CODE: 50,
      NAME: 'Không duyệt',
      COLOR: '#FF3434',
    },
    90: {
      CODE: 90,
      NAME: 'Hủy',
      COLOR: '#EDAA00',
    },
  };

  static TYPE_RE = {
    RECEIPT: {
      VALUE: '1',
      NAME: 'Phiếu thu',
      TYPE: 10,
    },
    EXPENSE: {
      VALUE: '2',
      NAME: 'Phiếu chi',
      TYPE: 20,
    },
  };

  static STATUS_RE = {
    NEW: {
      VALUE: 10,
      NAME: 'Mới',
    },
    WAIT_APPROVE: {
      VALUE: 20,
      NAME: 'Chờ duyệt',
    },
    APPROVED: {
      VALUE: 30,
      NAME: 'Đã duyệt',
    },
    REQUEST_EDIT: {
      VALUE: 40,
      NAME: 'Yêu cầu sửa',
    },
    NOT_APPROVE: {
      VALUE: 50,
      NAME: 'Không duyệt',
    },
    CANCEL: {
      CODE: 90,
      NAME: 'Hủy',
    },
  };

  static FORMAT = {
    DATE_DB: 'YYYY-MM-DD',
    DATE_DISPLAY: 'DD/MM/YYYY',
  };

  static DateNow = {
    now: moment(new Date()).format('yyyyMMDDHHmmss'),
  };

  static KEY_TABLE = {
    RECEIPT: 'RECEIPT',
    EXPENSE: 'EXPENSE',
  };

  static DEBOUNCE_TIME_SEARCH = 400;
}

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
export const getComparator = (order, orderBy) =>
  (order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));
export const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
};
