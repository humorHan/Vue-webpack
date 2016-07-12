<template id="table">
    <table>
        <tr>
            <td v-for="item of tableData">
                {{item}}
            </td>
        </tr>
    </table>
</template>
<script>
    module.exports = {
        template: '#table',
        props: ["tableData"]
    }
</script>