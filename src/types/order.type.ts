export interface IStatusHistory {
  status: string;
  timestamp: string; // ISO string
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IServiceRequest {
  _id: string;
  clientName: string;
  phoneNumber: string;
  email: string;
  serviceAddress: string;
  brand: string;
  productline: string;
  model: string;
  variant: string;
  issueType: string;
  issueDescription: string;
  preferedDate: string; // ISO string
  preferedTime: string; // e.g., "10:00 AM"
  isAllAgreement: boolean;
  status: string; // e.g., "pending", "completed", etc.
  serviceProviderId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  statusHistory: IStatusHistory[];
  isDeleted: boolean;
  location: ILocation;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
