<template>
    <div class="single-tab" v-if="isActive">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        href() {
            return `#${this.name.toLowerCase().replace(/ /g, '-')}`;
        }
    },
    data () {
        return {
            isActive: false
        }
    },
    mounted () {
        this.isActive = this.selected   
    }
}
</script>