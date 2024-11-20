import { handleError } from '~/middlewares/utils'
import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'

export const getCollectionSchema = async (req, res) => {
  try {
    const chatbot = useKHTN_Chatbot()
    res.status(200).json(await chatbot.get_collection_schema(req.query.collection_id))
  } catch (error) {
    handleError(res, error)
  }
}