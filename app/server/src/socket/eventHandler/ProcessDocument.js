/* eslint-disable no-console */
import { useAirflow } from '~/apis/Airflow'
import { saveNewDocumentToDB } from '~/controllers/document/helper/saveNewDocumentToDB'

const airflow = useAirflow()
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export const ProcessDocument = async (socket) => {
  socket.on('/airflow/checkstatus', async (req) => { // dag_id, dag_run_id, state
    try {
      let res
      do {
        res = await airflow.CheckStatus(req?.dag_id, req?.dag_run_id)
        if (res?.state != req?.state) {
          socket.emit('/airflow/checkstatus', { 'file_id': req?.file_id, state: res.state })
          await saveNewDocumentToDB(req?.file_id, { state: res.state })
        }
        await delay(5000)
      } while (res.state != 'success' && res.state != 'failed')


    } catch (error) {
      socket.emit('/airflow/checkstatus/error', { 'message': 'Tự Động Cập Nhật Trạng Thái Thất Bại' })
      console.log('Ghi nhận lịch sử thất bại')
    }
  })
}