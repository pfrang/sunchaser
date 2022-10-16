export class AppConfig {
  next = {
    host: process.env.NEXT_PUBLIC_HOST as string,
  };

  azureFunction = {
    host: process.env.AZURE_FUNCTION_HOST as string,
    key: process.env.AZURE_FUNCTION_CODE,
  };
}
