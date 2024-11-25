import axios from "./axios";

export function getReferences(callback) {
    axios
        .get("/getReferences")
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getProducts(branch, callback) {
    axios
        .post(`/getProducts`, {
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
    axios
        .get(`/getCustomers`)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getOrders(branch, callback) {
    axios
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
    axios
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

export function getViewEmployee(data, callback) {
    axios
        .post("/getViewEmployee", {
            employeeID: data,
        })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function addInventory(data, setFlashMessage, setFlashStatus, onClose) {
    axios
        .post("/addInventory", data)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            if ((response.data.status = "success")) {
                onClose();
            }
        })
        .catch((error) => {
            setFlashMessage(error.response.data.message);
            setFlashStatus("error");
        });
}

export function editInventory(data, setFlashMessage, setFlashStatus, onClose) {
    axios
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
    axios
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
    axios
        .post("/getPurchases", { customerID: customerID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getOrderItems(orderID, callback) {
    axios
        .post("/getOrderItems", { orderID: orderID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function getCustomerInfo(customerID, callback) {
    axios
        .post("/getCustomerInfo", { customerID: customerID })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            return error;
        });
}

export function addEmployee(data, setFlashMessage, setFlashStatus, onBack) {
    axios
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

export function editEmployee(
    data,
    setFlashMessage,
    setFlashStatus,
    onBack,
    callback,
) {
    axios
        .post("/editEmployee", data)
        .then((response) => {
            setFlashMessage(response.data.message);
            setFlashStatus(response.data.status);
            callback(response.data);
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
    axios
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

export function userLogin(
    data,
    setFlashMessage,
    setFlashStatus,
    setLoginToken,
) {
    axios.post("/userLogin", data).then((response) => {
        setFlashMessage(response.data.message);
        setFlashStatus(response.data.status);
        setLoginToken(response.data.token);
    });
}

export function getUser(setUser) {
    axios.get("/getUser").then((response) => {
        setUser(response.data);
    });
}

export function editProfile(
    data,
    setFlashMessage,
    setFlashStatus,
    onBack,
    setComponentOnLoad,
) {
    axios.post("/editProfile", data).then((response) => {
        setFlashMessage(response.data.message);
        setFlashStatus(response.data.status);
        if (response.data.status === "success") {
            setComponentOnLoad(true);
            onBack();
        }
    });
}

export function getAllOrder(branch, callback) {
    axios.post("/getAllOrder", { branch: branch }).then((response) => {
        callback(response.data);
    });
}

export function setFulfill(order, setFlashMessage, setFlashStatus) {
    axios.post("/setOrderFulfilled", { orderID: order }).then((response) => {
        setFlashMessage(response.data.message);
        setFlashStatus(response.data.status);
    });
}
