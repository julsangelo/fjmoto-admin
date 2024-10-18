import axiosClient from "./axios";

export function getInventory(branch, callback) {
    axiosClient
        .get(`/getInventory`, {
            params: {
                branch: branch,
            },
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
