import { handleError } from '~/middlewares/utils'
import { getCollectionsFromDB } from './helper/getCollectionsFromDB'

export const loadCollectionsList = async (req, res) => {
  try {
    res.status(200).json(await getCollectionsFromDB())
  } catch (error) {
    handleError(res, error)
  }
}