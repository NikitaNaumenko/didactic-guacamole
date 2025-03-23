interface Route {
  readonly name: string;
  readonly action: string;
  readonly path: string;
  readonly method: string;
  readonly controller: string;
  readonly params: readonly string[];
}

type HTTPMethod = GET | POST | PATCH | PUT | DELETE;

type QueryParam = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryParam | QueryParam[]>;

type RouteParams = {
  "index": Record<string, never>;
  "registration.new": Record<string, never>;
  "register.create": Record<string, never>;
  "sign_in.new": Record<string, never>;
  "sign_in.create": Record<string, never>;
  "monitors.index": Record<string, never>;
  "monitors.edit.edit": {id: string | number};
  "monitors.new.new": Record<string, never>;
  "monitors.show": {id: string | number};
  "monitors.create": Record<string, never>;
  "monitors.update": {id: string | number};
  "monitors.update": {id: string | number};
  "monitors.delete": {id: string | number}
}

type RouteName = "index" | "registration.new" | "register.create" | "sign_in.new" | "sign_in.create" | "monitors.index" | "monitors.edit.edit" | "monitors.new.new" | "monitors.show" | "monitors.create" | "monitors.update" | "monitors.update" | "monitors.delete";

type RouteParamsWithQuery<T extends Record<string, any>> = T & {
  _query?: QueryParams;
}

type RoutePathConfig = {
  "/": Record<string, never>;
      "/registration": Record<string, never>;
      "/register": Record<string, never>;
      "/sign_in": Record<string, never>;
      "/sign_in": Record<string, never>;
      "/monitors": Record<string, never>;
      "/monitors/:id/edit": {id: string | number};
      "/monitors/new": Record<string, never>;
      "/monitors/:id": {id: string | number};
      "/monitors": Record<string, never>;
      "/monitors/:id": {id: string | number};
      "/monitors/:id": {id: string | number};
      "/monitors/:id": {id: string | number}
}

type RoutePath = keyof RoutePathConfig;

type PathParamsWithQuery<T extends RoutePath> = RoutePathConfig[T] & {
  _query?: QueryParams;
}

declare const Routes: {
  readonly routes: readonly Route[];

  route<T extends RouteName>(
    name: T,
    params?: RouteParamsWithQuery<RouteParams[T]>
  ): string;

  path<T extends RouteName>(
    name: T,
    params?: RouteParamsWithQuery<RouteParams[T]>
  ): string;

  replaceParams<T extends RoutePath>(
    path: T,
    params?: PathParamsWithQuery<T>
  ): string;

  method(name: RouteName): HTTPMethod;

  hasRoute(name: string): name is RouteName;
};

export as namespace Routes;
export { RoutePath, PathParamsWithQuery };
export = Routes;
