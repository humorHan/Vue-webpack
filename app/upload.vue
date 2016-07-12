<template id="tpl">
    <div class="wrap">
        <div class="title-wrapper">
            <div class="title" v-bind:class="flag ? '123': '345'">{{nameFromIndex}}</div>
            <div class="title-bg"></div>
        </div>
        <div class="content">
            <div class="time">
                年份
                <input v-model="bigTime" class="Wdate mr20" type="text" id="bigTime" onFocus="WdatePicker({isShowClear:false,readOnly:true})"/>
                上传时间
                <input v-model="startTime" class="Wdate" type="text" id="startTime" onFocus="WdatePicker({isShowClear:false,readOnly:true})"/>
                到
                <input v-model="endTime" class="Wdate mr20" type="text" id="endTime" onFocus="WdatePicker({isShowClear:false,readOnly:true})"/>
                审核时间
                <input v-model="sTime" class="Wdate" type="text" id="sTime" onFocus="WdatePicker({isShowClear:false,readOnly:true})"/>
                到
                <input v-model="eTime" class="Wdate" type="text" id="eTime" onFocus="WdatePicker({isShowClear:false,readOnly:true})"/>
            </div>
            <div class="second">
                状态
                <select class="status mr20" v-model="status">
                    <option selected>全部</option>
                    <option>待审核</option>
                </select>
                科目
                <select class="subject mr20" v-model="subject">
                    <option selected>语文</option>
                    <option>数学</option>
                    <option>英语</option>
                </select>
                年级
                <select class="grade mr20" v-model="grade">
                    <option selected>全部</option>
                    <option>一年级</option>
                    <option>二年级</option>
                    <option>三年级</option>
                </select>
                上传人
                <input type="text" v-model="person" placeholder="请输入上传人的名称">
            </div>
            <div class="area">
                地区
                <are></are>
            </div>
            <div class="paper">
                试卷类型
                <select class="mr20" v-model="type">
                    <option selected>全部</option>
                    <option>期中</option>
                    <option>期末</option>
                </select>
                试卷名称
                <input class="mr20" placeholder="请输入要查询的试卷名称" v-model="name">
                试卷ID
                <input class="mr20" placeholder="请输入要查询的试卷ID" v-model="id">
                <span class="search" @click="search">查询</span>
            </div>
            <tab :table-data="tableData"></tab>
        </div>
    </div>
</template>

<!-- v-的值必须是表达式不能是带解析的那种{{}}  -->
<!--请求ajax数据-->

<script>
    var area = require("./area.vue");
    var tab = require("./table.vue");
    module.exports = {
        template: '#tpl',
        props: ['nameFromIndex','flag'],
        data:function(){
            return {
                bigTime:'',
                startTime:'',
                endTime:'',
                sTime: '',
                eTime: '',
                status:'',
                subject:'',
                grade:'',
                person:'',
                type:'',
                name:'',
                id:'',

                tableData:''
            }
        },
        components:{
            "are": area,
            "tab": tab
        },
        methods: {
            search: function(){
                //带上参数
                this.$http.get("").then(function(data){
                    //假数据
                    var fakeData = [1,2,3,4,5,6,7,8];
                    this.tableData = fakeData;
                    console.log(this.$data);
                });
            }
        }
    };
</script>