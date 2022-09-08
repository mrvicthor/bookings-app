export interface Booking {
  id: number;
  author: Author;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  fault: string;
  engineerReport: string;
  item: string;
  brand: string;
  itemModel: string;
  hardwareInstallation: number;
  softwareInstallation: number;
  isDone: boolean;
}

interface Author {
  username: string;
}
