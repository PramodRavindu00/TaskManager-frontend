import "axios";
declare module "axios" {
  interface AxiosRequestConfig {
    public?: boolean; //adding a custom public attribute
    _retry?: boolean;
  }
}
