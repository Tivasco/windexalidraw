declare module 'keycloak-js' {
  export default class Keycloak {
    constructor(config?: any);
    init(options?: any): Promise<boolean>;
    login(options?: any): Promise<void>;
    logout(options?: any): Promise<void>;
    updateToken(minValidity: number): Promise<boolean>;
    token?: string;
    onTokenExpired?: () => void;
    authenticated?: boolean;
  }
} 