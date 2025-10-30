import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import type { TypeSetAccount, TypeSetIsOpen } from "../types/states";

const firebaseConfig = {
  apiKey: "AIzaSyBYecI5v1ygXAftux9G3sPSrMFqit4S49U",
  authDomain: "kvl-tables.firebaseapp.com",
  projectId: "kvl-tables",
  storageBucket: "kvl-tables.firebasestorage.app",
  messagingSenderId: "28455496009",
  appId: "1:28455496009:web:d538f9a800334127b51298",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getUserName = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      unsubscribe();

      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            resolve(userDoc.data().name || "Имя не указано");
          } else {
            console.error("Документ пользователя не найден.");
            resolve(null);
          }
        } catch (err) {
          console.error("Ошибка Firestore:", err);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

export const autoLogin = async (
  setIsOpen: TypeSetIsOpen,
  setAccount: TypeSetAccount
) => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    unsubscribe();

    if (currentUser) {
      const now = new Date().getTime();
      let lastAuth: number;
      const localTimestamp = localStorage.getItem("lastAuth");

      if (localTimestamp) {
        lastAuth = +localTimestamp;
        if (now - lastAuth < 2 * 60 * 60 * 1000) {
          setIsOpen(false);
          setAccount(await getUserName());
        } else logout(setIsOpen, setAccount);
      } else return false;

      return true;
    } else return false;
  });
};

export const logout = async (
  setIsOpen: TypeSetIsOpen,
  setAccount: TypeSetAccount
) => {
  try {
    await signOut(auth);
    setIsOpen(true);
    setAccount(null);
  } catch (error) {
    console.error("Ошибка логаута:", error);
    alert("Ошибка выхода");
  }
};

export const handleLogin = async (
  login: string,
  password: string,
  setIsOpen: TypeSetIsOpen,
  setAccount: TypeSetAccount
) => {
  try {
    await signInWithEmailAndPassword(auth, login, password);
    setIsOpen(false);
    setAccount(await getUserName());
    localStorage.setItem("lastAuth", `${new Date().getTime()}`);
    console.log("Вход успешен!");
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

// export const addUserName = async (uid: string, name: string) => {    // для добавления информации в базу
//   try {
//     await setDoc(doc(db, 'users', uid), { name: name });
//     console.log('Имя добавлено для UID:', uid);
//   } catch (error) {
//     console.error('Ошибка:', error);
//   }
// };
