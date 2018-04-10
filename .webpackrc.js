export default {
  "proxy": {
  "/api": {
    "target": "http://cangdu.org:8001/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
},
}
