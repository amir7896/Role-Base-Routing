/* eslint-disable no-useless-catch */
// const { USER } = require('constants/AppConstants');
import { USER, TOKEN } from "../constants/AppContants";

class LocalStorage {
  static sharedInstance = new LocalStorage();

  constructor() {
    if (LocalStorage.sharedInstance != null) {
      return LocalStorage.sharedInstance;
    }
  }

  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      throw error;
    }
  }

  set(key, value) {
    try {
      return localStorage.setItem(key, value);
    } catch (error) {
      throw error;
    }
  }

  remove(key) {
    try {
      return localStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }

  getObject(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      throw error;
    }
  }

  setObject(key, value) {
    try {
      return localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER));
    } catch (error) {
      throw error;
    }
  }

  setUser(value) {
    try {
      return localStorage.setItem(USER, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }

  removeUser() {
    try {
      return localStorage.removeItem(USER);
    } catch (error) {
      throw error;
    }
  }
  setToken(value) {
    try {
      return localStorage.setItem(TOKEN, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }
  getToken() {
    try {
      return JSON.parse(localStorage.getItem(TOKEN));
    } catch (error) {
      throw error;
    }
  }

  removeToken() {
    try {
      return localStorage.removeItem(TOKEN);
    } catch (error) {
      throw error;
    }
  }

  setCache(data) {
    let cache = JSON.parse(localStorage.getItem("CACHE"));
    cache = !cache ? {} : cache;
    cache = { ...cache, ...data };
    localStorage.setItem("CACHE", JSON.stringify(cache));
  }

  getCache(key) {
    const cache = JSON.parse(localStorage.getItem("CACHE"));
    if (!cache || !(key in cache)) return undefined;
    return cache[key];
  }

  removeFromCache(key) {
    let cache = JSON.parse(localStorage.getItem("CACHE"));
    if (!cache || !(key in cache)) return undefined;
    delete cache[key];
    localStorage.setItem("CACHE", JSON.stringify(cache));
    return true;
  }

  clearCache() {
    localStorage.removeItem("CACHE");
  }
}

export default LocalStorage.sharedInstance;
