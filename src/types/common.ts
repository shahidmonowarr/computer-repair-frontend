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

export type IServiceTypes = {
  serviceId: string;
  serviceName: string;
  description: string;
  serviceImage: string;
  servicePrice: number;
  serviceStatus: string;
};

export type IBlogType = {
  blogId: string;
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  createdAt?: string;
  updatedAt?: string;
  profileId?: string;
  profile?: {
    firstName: string;
    lastName: string;
    profileImage: string;
  };
};

export type FaqType = {
  key: string;
  label: string;
  children: JSX.Element | any;
};
