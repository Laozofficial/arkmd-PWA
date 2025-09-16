import { recoilPersist } from "recoil-persist";
import { decryptData, encryptData } from "../../components/utils";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: {
    setItem(key, value) {
      const encryptedValue = encryptData(value);
      localStorage.setItem(key, encryptedValue);
    },
    getItem(key) {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) {
        return null;
      }
      return decryptData(encryptedValue);
    },
  },
});

export { persistAtom };
