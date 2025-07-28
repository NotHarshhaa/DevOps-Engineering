import type { NextRequest } from "next/server";

declare module "next/dist/server/web/exports/next-request" {
  type NextRequest = Request
}

declare module "next/dist/server/web/exports/next-response" {
  type NextResponse = Response
}

declare module "next/server" {
  export interface AppRouteHandlerContext<Params extends { [key: string]: string | string[] } = object> {
    params: Params;
  }
}

declare module "next" {
  export interface RouteHandlerFn<Params extends { [key: string]: string | string[] } = object> {
    (request: NextRequest, context: { params: Params }): Promise<Response> | Response;
  }
}
