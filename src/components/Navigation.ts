import { routes } from '@/router'

export function resolveRouteName(routeKey: string){
  const resolvedRouteIndex = routes.findIndex(el => el.path === routeKey);
  if (resolvedRouteIndex === -1){
    return null;
  }

  return routes[resolvedRouteIndex].title;
}
