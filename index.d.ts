import { Strategy } from "passport";
import { Request } from "express";

declare namespace SpotifyStrategy {
  type VerifyCallback = (
    err?: Error | null,
    user?: object,
    info?: object
  ) => void;

  type VerifyFunction =
    | ((
        accessToken: string,
        refreshToken: string,
        profile: any,
        verify: VerifyCallback
      ) => void)
    | ((
        accessToken: string,
        refreshToken: string,
        expires_in: number,
        profile: any,
        verify: VerifyCallback
      ) => void);

  type VerifyFunctionWithRequest =
    | ((
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        verified: VerifyCallback
      ) => void)
    | ((
        req: Request,
        accessToken: string,
        refreshToken: string,
        expires_in: number,
        profile: any,
        verified: VerifyCallback
      ) => void);

  interface _StrategyOptionsBase {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }

  interface StrategyOptions extends _StrategyOptionsBase {
    passReqToCallback?: boolean;
  }

  interface StrategyOptionsWithRequest extends _StrategyOptionsBase {
    passReqToCallback: boolean;
  }

  type Strategy = SpotifyStrategy;
  const Strategy: typeof SpotifyStrategy;

  class TokenError extends Error {
    constructor(
      message: string | undefined,
      code: string,
      uri?: string,
      status?: number
    );
    code: string;
    uri?: string;
    status: number;
  }

  class AuthorizationError extends Error {
    constructor(
      message: string | undefined,
      code: string,
      uri?: string,
      status?: number
    );
    code: string;
    uri?: string;
    status: number;
  }

  class InternalOAuthError extends Error {
    constructor(message: string, err: any);
    oauthError: any;
  }
}

declare class SpotifyStrategy implements Strategy {
  name: string;

  constructor(
    options:
      | SpotifyStrategy.StrategyOptions
      | SpotifyStrategy.StrategyOptionsWithRequest,
    verify:
      | SpotifyStrategy.VerifyFunction
      | SpotifyStrategy.VerifyFunctionWithRequest
  );

  authenticate(req: Request, options?: any): void;

  userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: any) => void
  ): void;

  authorizationParams(options?: { showDialog?: boolean }): object;
  tokenParams(options: any): object;
  parseErrorResponse(body: any, status: number): Error | null;
}

export { SpotifyStrategy as Strategy };
