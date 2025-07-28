/// <reference types="next" />

// Extend the Next.js types for route handlers
declare namespace NodeJS {
  interface Global {
    // Define route handler function signatures
    GET: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;

    POST: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;

    PUT: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;

    DELETE: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;

    PATCH: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;

    HEAD: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;

    OPTIONS: (
      request: Request | import('next/server').NextRequest,
      context: { params: any }
    ) => Response | Promise<Response>;
  }
}

// Override Next.js route handler context definition
declare module 'next/server' {
  export interface RouteHandlerContext<Params = any> {
    params: Params;
  }
}

// Preserve existing definitions
/// <reference types="next/types/global" />
