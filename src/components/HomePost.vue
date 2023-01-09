<template>
    <div class="postWrapper">
        <h3 class="title">
            {{ title }}
        </h3>
        <span class="text">
            {{ text }}
        </span>
        <p class="comment">
            {{'Amount comments: ' + comment }}
        </p>
        <button type="button" @click="doSomething(id)">
            Graph
        </button>
    </div>
</template>

<script>
    export default {
        name: 'MyPost',
        props: {
            title: String,
            text: String,
            comment: Number,
            id: Number
        },
        methods: {
            doSomething(id) {
                this.$emit('updateParent', {
                    amount: 'this.amount',
                    code: 'this.code',
                    id: id
                })
            }
    }
    }
</script>

<style lang="scss" scoped>
    .postWrapper{
        width: 80%;
        background: #14434a;
        margin-top: 20px;
        padding: 10px;
        border-radius: 15px;
        .title{
            color: white;
            font-size: 20px;
            letter-spacing: 1.6px;
            margin-bottom: 10px;
        }
        .text{
            color: white;
            font-size: 18px;
        }
        .comment{
            color: #0ae3ff;
            font-size: 18px;
            padding: 5px 0;
            font-style: italic;
        }

        button{
            height: 30px;
            width: 60px;
            background: #00bcd4;
            color: white;
            font-size: 16px;
            font-weight: 600;
            border-radius: 7px;
            border: none;
        }
    }
</style>