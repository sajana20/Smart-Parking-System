import * as SecureStore from "expo-secure-store";
const sessionStorageService = {};

//store data
sessionStorageService.save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

sessionStorageService.get = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  return result;
};

sessionStorageService.remove = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export default sessionStorageService;
