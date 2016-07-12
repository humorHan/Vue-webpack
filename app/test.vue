<template id="kid">
    <div>
        <ul v-for="item of arr">
            <li>{{item}}</li>
        </ul>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
                arr: [123,234,345]
            }
        },
        template: '#kid'
    }
</script>