// src/store/userState.js
import { atom } from "recoil";

export const userNameState = atom({
  key: "userNameState", 
  default: "",   
});
