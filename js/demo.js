/**
 * Created by humorHan on 2016/7/4.
 */
var ve = new Vue({
    el: '#demo',
    data: {
        message: 'hello vue-demo!',
        todos: [
            {
                text: 'Add some todos'
            }
        ],
        isTrue: 'true',
        firstName:'li',
        name:' yuan fang',
        total: 'li yuan fang'
    },
    methods: {
        changeMessage: function () {
            this.message = this.message.split('').reverse().join('');
            this.todos = this.todos.reverse();
        },
        add: function(){
            this.todos.push({text:this.message});
            this.isTrue = false;
        },
        deleteList: function(index){
            this.todos.splice(index, 1);
        },
        changeTrueFalse: function(){
            this.isTrue = this.isTrue ? false : true;
        }
    }
});
//$watch 还不如直接用computed
ve.$watch('firstName', function (val) {
    this.total = val + ' ' + this.name
});

//example
var example = new Vue({
    el: '#example',
    data: {
        a: 1,
        b: 2
    },
    //computed的   方法   都会被拷贝到data下 属性不会
    computed: {
        // 一个计算属性的 getter
        c: function () {
            // `this` 指向 vm 实例
            this.firstName = 'asd';
            return this.a + 10
        }
    }
});