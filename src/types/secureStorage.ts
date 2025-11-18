export type KeychainService = 
  | '@app:auth_token'
  | '@app:api_key'
  | '@app:biometric';

export interface SecureStorageCredentials {
  username: string;
  password: string;
  service: string;
}
