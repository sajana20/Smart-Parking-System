import * as SecureStore from "expo-secure-store";
const sessionStorageService = {};

//store data
sessionStorageService.save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

//get stored data
sessionStorageService.get = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  return result;
};

//remove stored data
sessionStorageService.remove = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export default sessionStorageService;
