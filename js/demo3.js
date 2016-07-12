/**
 * Created by humorHan on 2016/7/4.
 */
new Vue({
    el: 'body',
    data: {
        show: true,
        //transitionName: 'fade'
    }
});

Vue.transition('fade', {
    css: false,
    enter: function (el, done) {
        // Ԫ���ѱ����� DOM
        // �ڶ������������ done
        $(el)
            .css('opacity', 0)
            .animate({ opacity: 1 }, 1000, done)
    },
    enterCancelled: function (el) {
        $(el).stop()
    },
    leave: function (el, done) {
        // �� enter ��ͬ
        $(el).animate({ opacity: 0 }, 1000, done)
    },
    leaveCancelled: function (el) {
        $(el).stop()
    }
})