import { determine_collection } from './Conservation/determine_collection'
import { generate } from './Conservation/generate'
import { search } from './Conservation/search'
import { extract_meta } from './Conservation/extract_meta'

import { get_collection_schema } from './Document/get_collection_schema'

export const useKHTN_Chatbot = () => ({
  determine_collection,
  generate,
  search,
  extract_meta,
  get_collection_schema
})