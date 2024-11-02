import axiosClient from "./axios";

export function getInventory(branch, callback) {
    axiosClient
        .post(`/getInventory`, {
            branch: branch,
        })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getCustomers(callback) {
    axiosClient
        .get(`/getCustomers`)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getOrders(branch, callback) {
    axiosClient
        .post(`/getOrders`, {
            branch: branch,
        })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getEmployees(branch, callback) {
    axiosClient
        .post(`/getEmployees`, {
            branch: branch,
        })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function addInventory(data) {
    axiosClient
        .post("/addInventory", data)
        .then((response) => {
            console.log("Inventory added:", response.data);
        })
        .catch((error) => {
            console.error("Error adding inventory:", error);
        });
}

export function editInventory(data) {
    axiosClient
        .post("/editInventory", data)
        .then((response) => {
            console.log("Inventory added:", response.data);
        })
        .catch((error) => {
            console.error("Error adding inventory:", error);
        });
}

export function deleteInventory(productId, callback) {
    axiosClient
        .post(`/deleteInventory`, { productID: productId })
        .then((response) => {
            callback(response.data);
            console.log(productId);
        })
        .catch((error) => {
            return error;
        });
}

export function getCustomerOrders(customerID, callback) {
    axiosClient
        .post("/getPurchases", { customerID: customerID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getOrderItems(orderID, callback) {
    axiosClient
        .post("/getOrderItems", { orderID: orderID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getCustomerInfo(customerID, callback) {
    axiosClient
        .post("/getCustomers", { customerID: customerID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}
