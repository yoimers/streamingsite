import algoliasearch from "algoliasearch";

export const client = algoliasearch(
  "KVR5G8YCSX",
  "45d55ae47cebf4624639f56cff4bd128"
);
export const index = client.initIndex("your_index_name");

const publicKey = client.generateSecuredApiKey(
  "98f6672819d09a49b9b011ffec8f7a4f",
  {
    filters: "_tags:user_firebase",
  }
);

console.log(publicKey);
