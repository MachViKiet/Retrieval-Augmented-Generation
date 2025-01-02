import buildErrObject from '../../middlewares/utils/buildErrObject'

/* eslint-disable no-unused-vars */
const domain = `http://${process.env.AIRFLOW_HOST}:${process.env.AIRFLOW_PORT}`
// https://airflow.apache.org/api/v1/dags/{dag_id}/dagRuns/{dag_run_id}
export const CheckStatus = async (dag_id = null, dag_run_id = null, api_key = null) => {
  const url = `${domain}/api/v1/dags/${dag_id}/dagRuns/${dag_run_id}`

  // Thực hiện GET request
  return fetch(url, {
    method: 'GET', // Sử dụng phương thức POST
    headers: {
      'Content-Type': 'application/json', // Đặt header cho content type là JSON
      'username': 'airflow',
      'password': 'airflow',
      'Authorization': 'Basic ' + btoa('airflow' + ':' + 'airflow')
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .catch(error => {
      throw buildErrObject(422, error)
    })
}

