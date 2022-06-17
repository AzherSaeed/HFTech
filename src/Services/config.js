export const API_URL = "https://node01.dagnum.com:8443/hftech/api/";
export const GET_CONTACT = "contact/get";
export const GET_CLIENT = "client/get";
export const GET_CLIENT_DETAIL = 'client/getById'
export const CLIENT_UPDATE = "client/update";
export const CLIENT_CREATE = "client/save";
export const CLIENT_DELETE = 'client/delate'
export const SAVE_CONTACT = "contact/save";
export const CONTACT_GET_BY_ID = "contact/getById";
export const CONTACT_UPDATE = "contact/update";
export const CONTACT_DELETE = "contact/delate";
export const LINE_ITEMS_GET = 'lineItem/get';

// User Line Items

export const LIST_ADMIN_LINE_ITEMS_TYPE_LABOUR = 'lineItem/getLineItemByItemType?lineType=Labor';
export const LIST_ADMIN_LINE_ITEMS_TYPE_MATERIALS = 'lineItem/getLineItemByItemType?lineType=Materials';
export const LIST_ADMIN_LINE_ITEMS_BY_ID = 'lineItem/getById?lineItemId=';
export const LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_LABOUR = 'userLineItem/getbyUserIdAndType?lineItemType=Labor';
export const LIST_ADMIN_LINE_ITEMS_BY_ID_TYPE_MATERIALS = 'userLineItem/getbyUserIdAndType?lineItemType=Materials';
export const USER_LINE_ITEM__DETAILS_BY_ID = 'userLineItem/getById?userLineItemId=';
export const USER_LINE_ITEM_UPDATE = 'userLineItem/save';
export const USER_LINE_ITEM_DELETE = 'userLineItem/delate?userLineItemId=';

// Estimate Create
export const ESTIMATE_CLIENTS_DATA_DROPDOWN='client/get';
export const ESTIMATE_LOCATIONS_DATA_SELECT='space/getByClientId?clientId=';
export const ESTIMATE_CONTACT_DATA_SELECT='contact/getByClientId?clientId=';
export const ESTIMATE_CREATED_DATA_SAVE='estimate/save';
export const ESTIMATE_TABLE_GET_LIST='estimate/get';
export const ESTIMATE_TABLE_ITEM_DETAILS='estimate/getById?estimateId=';
export const ESTIMATE_LINE_ITEM_DETAILS='userLineItem/getById?userLineItemId=';
export const ESTIMATE_LIST_ITEM_DELETE='estimate/delate?estimatesId=';

export const USER_LINE_ITEM_SAVE = 'userLineItem/save';
export const GET_SPACE_DETAIL = "space/get";
export const GET_SPACE_BY_ID = "space/getById";
export const GET_STATE_BY_ID = "state/getStateByCountryId";
export const GET_CITY_BY_ID = "city/getCitiesByStateId";
export const GET_COUNTRY = "country/get";
export const UPDATE_SPACE = "space/updateSpace";
export const DELETE_SPACE = "space/delateSpace";
export const CREATE_SPACE = "space/addSpace";
export const CREATE_LINEITEM = 'lineItem/save';
export const FORGOT_PASSWORD = 'user/forgotPassword';
export const RESET_PASSWORD = 'user/restPassword';
export const LINEITEM_DETAIL = 'lineItem/getById'
export const LINEITEM_UPDATE = 'lineItem/update'
export const LINEITEM_DELETE = 'lineItem/delate'
export const UNITOFMEASUREMENT_SAVE = 'setup/saveUnitOfMeasure';
export const UNITOFMEASUREMENT_GET = 'setup/get';
export const UNITOFMEASUREMENT_UPDATE = 'setup/updateUnitOfMeasure';
export const UNITOFMEASUREMENT_DELETE = '/setup/delate'