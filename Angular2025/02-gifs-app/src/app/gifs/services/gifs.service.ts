import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, tap } from "rxjs";


@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>({})
  searchHistoryKeys = computed<string[]>(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((res) => {
      const gifs = GifMapper.mapGiphyItemstoGifArray(res.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        q: query,
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).pipe(
      map(({ data }) => data),
      // en este caso "items" es el equivalente a "data" gracias a la deestructuración
      // Sin el primer map, se tendría que especificar items.data
      map((items) => GifMapper.mapGiphyItemstoGifArray(items)),
      tap((items) => this.searchHistory.update(history => ({ ...history, [query.toLowerCase()]: items })))
    )
  }
}