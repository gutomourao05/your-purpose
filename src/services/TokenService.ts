import * as SecureStore from 'expo-secure-store';

async function saveToken(token: string) {
    await SecureStore.setItemAsync('authToken', token);
}

async function getToken() {
    const token = await SecureStore.getItemAsync('authToken');
    return token;
}

async function deleteToken() {
    await SecureStore.deleteItemAsync('authToken');
}

export { saveToken, getToken, deleteToken }