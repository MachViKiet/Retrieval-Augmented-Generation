import { useKHTN_Chatbot } from '../../../apis/KHTN_Chatbot'
import { buildErrObject } from '../../../middlewares/utils'

export const enhanceDocumentAPI = async (id = '', req = null) => {
  if (!req?.body.collection_name) throw buildErrObject(422, 'Collection name is require')
  if (!req?.body.article) throw buildErrObject(422, 'Article name is require')
  try {
    const formData = new FormData
    formData.append('collection_name', req?.body.collection_name )
    formData.append('article', req?.body.article )
    const res = await useKHTN_Chatbot().enhance_file(formData)
      .catch((err) => { console.log(err) ; throw buildErrObject(422, err.message) })
    return res
  } catch (error) {
    throw buildErrObject(422, error.message)
  }
}

export default enhanceDocumentAPI