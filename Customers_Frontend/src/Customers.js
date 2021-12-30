// Actions
const GET_ALL_CUSTOMERS = "CUSTOMER_SYSTEM/Customers_FrontEnd/Customers/GET_ALL_CUSTOMERS";
const CREATE_CUSTOMER = "CUSTOMER_SYSTEM/Customers_FrontEnd/Customers/CREATE_CUSTOMER";
const UPDATE_CUSTOMER = "CUSTOMER_SYSTEM/Customers_FrontEnd/Customers/UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "CUSTOMER_SYSTEM/Customers_FrontEnd/Customers/DELETE_CUSTOMER";
const GET_ALL_ORDERS = "CUSTOMER_SYSTEM/Customers_FrontEnd/Customers/GET_ALL_ORDERS";
const CREATE_ORDER = "CUSTOMER_SYSTEM/Customers_FrontEnd/Customers/CREATE_ORDER";

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case GET_ALL_CUSTOMERS:
    return
    
    default:
      return state;
  }
}

// Action Creators
export function getAllCutomers() {
  return { type: GET_ALL_CUSTOMERS }; 
}

export function createCustomer(customer) {
  return { type: CREATE_CUSTOMER, customer };
}

export function updateCustomer(customer) {
  return { type: UPDATE_CUSTOMER, customer };
}

export function deleteCustomer(customer) {
  return { type: DELETE_CUSTOMER, customer };
}

export function getAllOrders() {
  return { type: GET_ALL_ORDERS };
}


export function createOrder(order) {
  return { type: CREATE_ORDER, order };
}

