import { useQuery } from "@tanstack/react-query";
import {
  fetchAlbumDetails,
  fetchHomeData,
  fetchSearchResults,
  fetchTopSearches,
} from "./base";

export const useGetHomeData = () =>
  useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
  });

export const useGetAlbumData = (type, id) =>
  useQuery({
    queryKey: ["albumData", type, id],
    queryFn: () => fetchAlbumDetails(type, id),
  });

export const useGetTopSearches = () =>
  useQuery({
    queryKey: ["topSearches"],
    queryFn: fetchTopSearches,
  });

export const useGetSearchResults = (q) => {
  const query = useQuery({
    queryKey: ["searchResults", q],
    queryFn: () => fetchSearchResults(q),
    enabled: false,
  });

  const fetch = () => {
    if (query.isFetching) return Promise.resolve(query);
    if (query.isFetched && !query.isStale && !query.isError) {
      // browser hangs without this setTimeout
      return new Promise((resolve) => setTimeout(() => resolve(query)));
    }
    return query.refetch();
  };

  return { ...query, fetch };
};
