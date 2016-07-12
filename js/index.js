/**
 * Created by humorHan on 2016/7/7.
 */
Vue.use(require('vue-resource'));
var upload = require("../app/upload.vue");

var index = new Vue({
    el: ".wrapper",
    data: {
        "name":'上传统计',
        "isTrue": 'true'
    },
    components:{
        "upload": upload
    }
});