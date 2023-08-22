import axios from 'axios';

const BASE_URL = 'http://20.244.56.144';
const TOKEN = "YOUR_GENERATED_TOKEN";  

export const getAllTrains = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/train/trains`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all trains", error);
    }
}

export const getTrainDetails = async (trainNumber) => {
    try {
        const response = await axios.get(`${BASE_URL}/train/trains/${trainNumber}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for train ${trainNumber}`, error);
    }
}
