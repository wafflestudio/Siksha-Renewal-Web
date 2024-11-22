// Extend the Window interface for global scope (if needed)
declare global {
  interface Window {
    kakao: any;
    AppleID: {
      auth: {
        init: (config: ClientConfig) => void;
        signIn: (config?: ClientConfig) => Promise<SigninResponse>;
      };
    };
  }

  // apple sign in types
  interface ClientConfig {
    clientId: string;
    redirectURI: string;
    scope?: string;
    state?: string;
    nonce?: string;
    usePopup?: boolean;
  }

  interface Authorization {
    code: string;
    id_token: string;
    state?: string;
  }

  interface AppleUser {
    email: string;
    name: string;
  }

  interface SigninResponse {
    authorization: Authorization;
    user?: AppleUser;
  }

  interface SigninError {
    error: string;
  }
}

// Ensure the file is treated as a module
export {};
