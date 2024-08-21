export type TErrorSources = {
  path: string | number;
  message: string;
  // error: any;
}[];
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
