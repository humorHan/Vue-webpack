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
//$watch ������ֱ����computed
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
    //computed��   ����   ���ᱻ������data�� ���Բ���
    computed: {
        // һ���������Ե� getter
        c: function () {
            // `this` ָ�� vm ʵ��
            this.firstName = 'asd';
            return this.a + 10
        }
    }
});