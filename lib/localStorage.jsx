import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const handleError = (error) => {
    console.error("AsyncStorage Error:", error);
    Alert.alert(
        "Error",
        (typeof error?.message === "string" && error.message) ||
        "An unexpected error occurred.",
        [{ text: "OK" }]
    );
};

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        handleError(e);
        throw new Error("Failed to save data");
    }
};

const getData = async (key) => {
    try {
        const retrievedData = await AsyncStorage.getItem(key);
        if (retrievedData !== null) {
            const parsedData = JSON.parse(retrievedData); // Convert the JSON string back to an object
            return parsedData;
        }
    } catch (e) {
        handleError(e);
        throw new Error("Failed to fetch data");
    }
};

const clearData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        handleError(e);
        throw new Error("Failed to clear data");
    }
};

export { clearData, getData, storeData };