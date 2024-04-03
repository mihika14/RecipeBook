import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com/recipes/random?number=10&apiKey=b5fcf4e428414bf0bea720b25ea6d8a9';

export const fetchUserData = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
};