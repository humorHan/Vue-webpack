/**
 * Created by humorHan on 2016/7/5.
 */
var testVue = require("../app/test");

var menu = new Vue({
    el: '#test',
    data: {
        firstName: '张',
        lastName: '三',
        age: '25',
        sex: 'man',
        items: [1,2,3]
    },
    template: '#self',
    computed: {
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        }
    },
    methods: {
        sayHello: function(){
            console.log('你好 ' + this.fullName);
        }
    }
});

/*同一个vue实例下，页面的模板(template)会覆盖掉组件的渲染，因为在父页面渲染的时候浏览器不认识组件的挂载点所以会忽略
* 解决办法有两种，一种是在页面模板中写自定义标签(挂载点),另一种就是重新声明新的vue实例*/
new Vue({
    el: '#test2',
    components: {
        'menu': testVue
    }
});

Vue.use(require('vue-resource'));

new Vue({
    el: '#test3',
    ready: function(){
        this.$http.get('https://api.myjson.com/bins/r8mm').then(function(data){
            console.log(data);
        },function(data, status, request){
            console.log('fail' + status + "," + request);
        })
    }
});
console.log(menu.$log());