import { useAirflow } from '~/apis/Airflow'
import { saveNewDocumentToDB } from '~/controllers/document/helper/saveNewDocumentToDB'
const { ObjectId } = require('mongodb')

const airflow = useAirflow()
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const ProcessDocument = async (socket) => {
  socket.on('/airflow/checkstatus', async (req) => {
    console.log('socket --- ',req?.dag_id, req?.dag_run_id)
    try {
      let res = await airflow.CheckStatus(req?.dag_id, req?.dag_run_id)
      socket.emit('/airflow/checkstatus' , {"file_id": req?.file_id, state: res.state})
      console.log({"file_id": req?.file_id, res})
      
      while(res.state == 'queued') {
        res = await airflow.CheckStatus(req?.dag_id, req?.dag_run_id)
        console.log({"file_id": req?.file_id, res})
        await delay(5000)
        socket.emit('/airflow/checkstatus', {"file_id": req?.file_id, state: res.state})
      }

      await saveNewDocumentToDB(req?.file_id, { state: res.state })
      socket.emit('/airflow/checkstatus' , {"file_id": req?.file_id, state: res.state})


    } catch (error) {
      console.log(error)
    }
  })
}