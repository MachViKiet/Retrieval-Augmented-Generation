import { handleError, isIDGood } from '~/middlewares/utils'
import { processDocument } from './helper/processDocument'

export const process = async (req, res) => {
  try {
    const id = await isIDGood(req.body.id)
    res.status(200).json(await processDocument(id, req.body.chunks))
  } catch (error) {
    handleError(res, error)
  }
}