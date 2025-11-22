interface IJwtPayload {
  userId: string;
  name: string;
  profileImage: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface ITechnicianProfile {
  _id: string;
  name: string;
  email: string;
  profileImage: string; // Assuming profileImage is a URL or an empty string
  role: "technician"; // You can expand roles as needed
  phone: string;
  address: string;
  yearOfExperience: number;
  specialties: string;
  adminVerified: "verified" | "pending" | "rejected"; // Can be expanded as needed
  isBlocked: boolean;
  isDeleted: boolean;
  acceptTerms: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number; // Version key for MongoDB
}

export type { IJwtPayload, ITechnicianProfile };
