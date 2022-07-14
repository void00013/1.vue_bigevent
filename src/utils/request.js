import axios from "axios";

const request = axios.create({
  baseURL: 'http://big-event-api-t.itheima.net'
})

export default request
