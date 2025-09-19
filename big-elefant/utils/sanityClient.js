// src/lib/sanityClient.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: "sutdqaze",
  dataset: 'production',            // or your dataset name
  useCdn: false,                     // `false` if you want fresh data always
  apiVersion: '2025-08-05',
  token: "skzhu7LwA3MEILtCSR0QRKVTOPyDuxCou97hclRmBcPBqO4qnPozPu9QPYfhqYweFsfP1pKy6tvXnOdxvrYB2YdmxuG4SKkLLUaTyCDzeFUtQ7ckfS2j2uwIrDcouaEuvpAmsSLkhibYsnKWf7BVNEZn1pvh7foVnkQ2NaQJFFtECZG3kaRK"
});
