import type { NextRequest } from 'next/server';

declare module 'next/server' {
  export interface RouteHandlerContext<Params extends { [key: string]: string | string[] } = object> {
    params: Params;
  }

  export interface AppRouteHandlerFn<Params extends { [key: string]: string | string[] } = object> {
    (
      request: NextRequest,
      context: { params: Params }
    ): Response | Promise<Response>;
  }
}

declare global {
  // This helps TypeScript understand the route handler exports
  namespace NodeJS {
    interface Global {
      GET: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;

      POST: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;

      PUT: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;

      DELETE: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;

      PATCH: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;

      HEAD: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;

      OPTIONS: <Params extends { [key: string]: string | string[] } = object>(
        request: NextRequest,
        context: { params: Params }
      ) => Response | Promise<Response>;
    }
  }
}
