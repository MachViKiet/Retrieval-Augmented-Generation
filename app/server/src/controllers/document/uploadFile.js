import { buildErrObject, handleError, isIDGood } from '~/middlewares/utils'
const path = require('path')
const fs = require('fs')
const Document = require('~/models/document')

function getFileExtension(fileName) {
  return path.extname(fileName)
}

function removeFileExtension(fileName) {
  return path.basename(fileName, path.extname(fileName))
}

export const uploadFile = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)

    if (!req.body?.collection) throw buildErrObject(422, 'COLLECTION NOT FOUND')
    if (!req.file) throw buildErrObject(400, 'No file uploaded.')

    const filename = new Date().getTime().toString() + '-' + (Math.random()*900+100).toFixed(0)
          + '-' + ( req.body.filename ? decodeURI(removeFileExtension(req.body.filename)) + getFileExtension(req.file.originalname) : req.file.originalname )

    const filePath = path.join(__dirname, '../../storage', filename)
    // Ghi file vào đĩa

    const action = new Promise((resolve, reject) => {
      fs.writeFile(filePath, req.file.buffer, async (err) => {

        if (err) {
          reject(buildErrObject(500, err))
        }

        const document = new Document({
          owner: id,
          originalName: req.file.originalname,
          collection_id: req.body?.collection,
          document_name: decodeURI(removeFileExtension(req.body.filename)),
          document_name_in_storage: filename,
          document_description: req.body?.description,
          url: `${process.env.STORAGE}/documents?name=${filename}`
        })

        document.save()
          .then((document) => {
            resolve({ document })
          })
          .catch((err) => { reject(buildErrObject(422, err.message)) })

      })
    })

    action.then((data) => {
      res.status(200).send(data)
    }).catch((err) => handleError(res, err))

  } catch (error) {
    handleError(res, error)
  }
}

const ensureUploadDir = () => {
  const uploadDir = path.join(__dirname, '../../storage')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
}
ensureUploadDir()