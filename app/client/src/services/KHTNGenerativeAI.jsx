import React from 'react'
import { useKHTN_Chatbot } from '~/apis/KHTN_Chatbot'

const KHTNGenerativeAI = () =>  {
  const service = {
    apikey: null,
    setAPIkey: (key) => { this.apikey = key },
    getAPIkey : () => {
      const key = this.apikey
      return key
    },
    step_1: async function (usrInput) {
      const res = await useKHTN_Chatbot.determine_collection(usrInput, this.apikey)
      return res
    },
    step_2: async function (usrInput, chosen_collections) {
      const res = await useKHTN_Chatbot.extract_meta(usrInput, chosen_collections, this.apikey)
      return res
    },
    step_3: async function (usrInput, chosen_collections, filter_expressions) {
      const res = await useKHTN_Chatbot.search(usrInput, chosen_collections, filter_expressions, this.apikey)
      return res
    },
    step_4: async function (usrInput, context, isStreaming) {
      const res = await useKHTN_Chatbot.generate(usrInput,  context, isStreaming, this.apikey)
      return res
    },
  }

  return service
}

export default KHTNGenerativeAI