import axios from 'axios'

const userEmailSelector = async (uid) => {
    const { data } = await axios.post('/api/fetch-email', { uid })
    return data.email;
};

export default userEmailSelector;