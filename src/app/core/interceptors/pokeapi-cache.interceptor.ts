import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

/**
 * In-memory cache for PokéAPI GET requests.
 * PokéAPI's fair-use policy requires local caching:
 * https://pokeapi.co/docs/v2#fairuse
 */
const cache = new Map<string, HttpResponse<unknown>>();

export const pokeapiCacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests to PokéAPI
  if (req.method !== 'GET' || !req.url.includes('pokeapi.co')) {
    return next(req);
  }

  const cached = cache.get(req.urlWithParams);

  if (cached) {
    return of(cached.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, event.clone());
      }
    }),
  );
};