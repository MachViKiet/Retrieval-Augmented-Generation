import { handleError } from '~/middlewares/utils'
import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'

const Collection = require('~/models/collection')

export const getCollectionSchema = async (req, res) => {
  try {
    const chatbot = useKHTN_Chatbot()

    const collection = await Collection.findById(req.query._id)
      .then((collection) => collection)

    const schema = await chatbot.get_collection_schema(collection.name)

    res.status(200).json(schema)
  } catch (error) {
    handleError(res, error)
  }
}