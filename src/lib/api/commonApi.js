import axiosInstance from "../axiosInstance";

export const registerUserApi = async (formData) => {
    try {
        const response = await axiosInstance.post("/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in registerUserApi:", error);
        throw error.response?.data || { message: "Something went wrong" };
    }
};

export const loginUserApi = async (data) => {

    try {
        const response = await axiosInstance.post("/auth/login", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in loginUserApi:", error);
        throw error.response?.data || { message: "Something went wrong" };
    }
};

export const getUserDataApi = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axiosInstance.post(
            "/user/getAll",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error in getUserDataApi:", error);
        throw error.response?.data || { message: "Something went wrong" };
    }
};
