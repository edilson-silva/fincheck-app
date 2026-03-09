export class StorageUtil {
  static FICHECK_PREFIX = "fincheck:";

  static setItem(key: string, value: unknown) {
    const strValue = typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(`${this.FICHECK_PREFIX}${key}`, strValue);
  }

  static getItem<T>(key: string): T | null {
    const value = localStorage.getItem(`${this.FICHECK_PREFIX}${key}`);

    return value ? JSON.parse(value) : null;
  }
}
