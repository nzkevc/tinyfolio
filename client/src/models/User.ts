export interface User {
  id: string;
  name: string;
  email: string;
  refreshToken?: string;
  refreshTokenExpiresAtUtc?: string;
  createdAt: string;
  updatedAt: string;
}
