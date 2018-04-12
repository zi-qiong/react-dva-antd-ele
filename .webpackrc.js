const path = require('path');

export default {
  "proxy": {
    "/api": {
      "target": "http://cangdu.org:8001/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  "alias": {
    "components": path.resolve(__dirname, "./src/components"),
    "models": path.resolve(__dirname, "./src/models"),
    "services": path.resolve(__dirname, "./src/services"),
    "pages": path.resolve(__dirname, "./src/pages"),
    "utils": path.resolve(__dirname, "./src/utils")
  }
}
