/**
 * Created by humorHan on 2016/7/4.
 */
var vm = new Vue({
    el: '#demo2',
    data: function(){
        return {msg: 'hello vue!'}
    },
    template: '#tpl'
});

var example2 = new Vue({
    el: '#example-2',
    data: {
        parentMessage: 'Parent',
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
});

var num = new Vue({
    el: '.num',
    methods:{
        say: function (msg, event) {
            // �������ǿ��Է���ԭ���¼�����
            event.preventDefault();
        },
        doThis: function(){},
        doThat: function(){},
        submit: function(){}
    }
});

var dom1 = new Vue({
    el: '.dom1',
    data: {
        msg:'123',
        age: '123'
    }
});