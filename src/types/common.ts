export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IHeaderType = {
  name: string;
  link: string;
  isSubMenu?: boolean;
  subMenu?: Array<ISubMenuType>;
};

export type ISubMenuType = {
  name: string;
  link: string;
};
