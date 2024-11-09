import axiosClient from "./axios";

export function getReferences(callback) {
    axiosClient
        .get("/getReferences")
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

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

export function addInventory(data, setFlashMessage, setFlashStatus, onClose) {
    axiosClient
        .post("/addInventory", data)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if ((response.data.status = "success")) {
                onClose();
            }
        })
        .catch((error) => {
            console.error("Error adding inventory:", error);
        });
}

export function editInventory(data, setFlashMessage, setFlashStatus, onClose) {
    axiosClient
        .post("/editInventory", data)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if ((response.data.status = "success")) {
                onClose();
            }
        })
        .catch((error) => {
            console.error("Error adding inventory:", error);
        });
}

export function deleteInventory(
    productID,
    setFlashMessage,
    setFlashStatus,
    onClose,
) {
    axiosClient
        .post(`/deleteInventory`, { productID: productID })
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if ((response.data.status = "success")) {
                onClose();
            }
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
        .post("/getCustomerInfo", { customerID: customerID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function addEmployee(data, setFlashMessage, setFlashStatus, onBack) {
    axiosClient
        .post("/addEmployee", data)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if ((response.data.status = "success")) {
                onBack();
            }
        })
        .catch((error) => {
            console.error("Error adding inventory:", error);
        });
}

export function editEmployee(data, setFlashMessage, setFlashStatus, onBack) {
    axiosClient
        .post("/editEmployee", data)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if ((response.data.status = "success")) {
                onBack();
            }
        })
        .catch((error) => {
            console.error("Error adding inventory:", error);
        });
}

export function deleteEmployee(
    employeeID,
    setFlashMessage,
    setFlashStatus,
    onClose,
    onBack,
) {
    axiosClient
        .post("/deleteEmployee", employeeID)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if (response.data.status === "success") {
                onClose();
                onBack();
            }
        })
        .catch((error) => {
            console.error("Error deleting employee:", error);
        });
}
