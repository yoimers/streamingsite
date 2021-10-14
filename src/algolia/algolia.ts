import algoliasearch from "algoliasearch";

export const client = algoliasearch(
  "KVR5G8YCSX",
  "45d55ae47cebf4624639f56cff4bd128"
);
export const index = client.initIndex("wavelet");
