export class Utils {
  static getIDFromObject(obj) {
    return obj.split('[')[1].slice(0, -1);
  }
}
