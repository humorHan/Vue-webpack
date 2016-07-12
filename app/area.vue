<template id="area">
    <select v-on:click="cityFun" class="mr20 w100">
        <option v-for="item in province">{{item.p_Name}}</option>
    </select>
    <select v-on:click="countryFun" class="mr20 w100">
        <option v-for="item in city">{{item.p_Name}}</option>
    </select>
    <select class="w100">
        <option v-for="item in country">{{item.p_Name}}</option>
    </select>
</template>

<script>
    var flag1,flag2;
    module.exports = {
        template: '#area',
        data: function(){
            return {
                province:[
                    {
                        p_Name: '不限省份'
                    }
                ],
                city:[
                    {
                        p_Name: '不限城市'
                    }
                ],
                country:[
                    {
                        p_Name: '不限区县'
                    }
                ]
            }
        },
        ready: function(){
            this.$http.get("../config/province-data.json").then(function(data){
                data.data.reverse().push({
                    p_Name: '不限省份'
                });
                flag1 = true;
                this.province= data.data.reverse();
                //console.log(this.$data);
            });
        },
        methods: {
            cityFun: function(){
                this.$http.get("../config/city-data.json").then(function(data){
                    //console.log(data);
                    if (flag1) {
                        data.data.reverse().push({
                            p_Name: '不限城市'
                        });
                        flag2 = true;
                        this.city = data.data.reverse();
                    }
                });
            },
            countryFun: function(){
                this.$http.get("../config/country-data.json").then(function(data){
                    //console.log(data);
                    if (flag2) {
                        data.data.reverse().push({
                            p_Name: '不限区县'
                        });
                        this.country= data.data.reverse();
                    }
                });
            }
        }
    }
</script>