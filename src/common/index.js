import {
  message
} from 'antd'
import 'whatwg-fetch'

//const api = 'http://localhost:5000/api'
const api = 'http://123.56.15.36:5000/api'
const dataToString = (data) => {
  const array = [];
  let index = 0
  for (const item in data) {
    if (data[item]) {
      array[index++] = [item, data[item]]
    }
  }
  return new URLSearchParams(array).toString()
}

export const format = (date) => {
  const myDate = new Date(date)
  const year = myDate.getFullYear()
  const month = myDate.getMonth() + 1
  const day = myDate.getDate()
  return `${year}-${month}-${day}`
}

//blog
export const fetchArticles = (payLoad) => blogFetch('/articles/get', payLoad);
export const addArticle = (payload) => blogFetch('/articles/add', payload, 'POST')
export const updateArticle = (payload) => blogFetch('/articles/update/' + payload._id, payload, 'POST')
export const deleteArticle = (payload) => blogFetch('/articles/delete' + payload.id, payload, 'DELETE')

// say
export const getSay = (payload) => blogFetch('/say/get',payload)
export const blogPost = (url, payload, method) => blogFetch('/say/' + url, payload, method)
export const fetchInfo = () => blogFetch('/authorinfo/get')
export const fetchCollect = (payload) => blogFetch('/get-collect', payload)

//login
export const login = (payload) => blogFetch('/login', payload, 'POST')


//serch
export const seachArticles = (payload) => blogFetch('/articles/search', payload, 'POST')


const blogFetch = (
  url,
  data,
  method = 'GET',
) => {
  let initObj = {}
  url = api + url
  let dataStr = ''
  if (data) {
    dataStr = dataToString(data)
  };
  
  let token = localStorage.getItem('token') || ""

  if (method === 'GET') {
    if (data) {
      if (url.indexOf('?') > -1) {
        url += '&' + dataStr
      } else {
        url += '?' + dataStr
      }
    } 
    token = JSON.parse(token)
    initObj = {
      headers:{
        Authorization: token,
      },
      method
    }
  } else if (url === api+"/login") {
   
    initObj = {
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      method
    }
  } else {
    token = JSON.parse(token)
    initObj = {
      body: JSON.stringify(data),
      headers: new Headers({
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      }),
      method
    }
  }


  return fetch(url, initObj).then(res => {

    if (res.status===401) {
      localStorage.removeItem('token')
      window.location.href="/admin/login"
    } else {
      return res.json()
    }
  }).then(data => {
    if (data.err) {
          message.error(data.message)
      }
    if (data.success) {
          message.success(data.message)
      }
      return data
    })
}
