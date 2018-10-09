let mongoURL=''
if (process.env.NODE_ENV == "production") {
  mongoURL = "mongodb://root:admin123@ds113703.mlab.com:13703/restful-api-prod-vue"
} else {
  mongoURL="mongodb://123.56.15.36:27017/zhangweijie"
}

module.exports = {
    mongoURL
}