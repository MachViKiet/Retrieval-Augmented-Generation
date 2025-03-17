import { createCollection } from "./createCollection";
import { getCollection } from "./getCollection";
import { getCollectionSchema } from "./getCollectionSchema";
import { getDocumentInCollection } from "./getDocumentInCollection";

export const useCollection = {
    getCollection,
    getCollectionSchema,
    getDocumentInCollection,
    createCollection
}