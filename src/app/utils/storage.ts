export class StorageUtil {
  static FICHECK_PREFIX = "fincheck:";

  static setItem(key: string, value: string) {
    localStorage.setItem(`${this.FICHECK_PREFIX}${key}`, value);
  }

  static getItem(key: string) {
    return localStorage.getItem(`${this.FICHECK_PREFIX}${key}`);
  }

  static removeItem(key: string) {
    return localStorage.removeItem(`${this.FICHECK_PREFIX}${key}`);
  }
}
