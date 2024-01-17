export class ErrorLogger {
  public static trackError(error: unknown) {
    console.error("Error from ErrorLogger: ", error);
  }
}
