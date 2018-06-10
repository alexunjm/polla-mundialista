<template>
    <div class="tabs-container">

        <div class="tabs is-centered is-boxed" ref="tabs">
            <ul>
                <li
                    v-for="(tab, index) in tabs"
                    :class="{ 'is-active': tab.isActive, 'is-disabled': loading }"
                    :key="index"
                >
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tabs: [],
            loading: false
        }
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.href === selectedTab.href);
            });
        },
        toggleLoading(loading) {
            this.loading = loading;
        },
    },
    created() {
        this.tabs = this.$children;        
    },
    mounted() {
        let urlHash = window.location.hash;
        let selected = false;
        if (urlHash) {
            this.tabs.forEach(tab => {
                if (tab.href === urlHash) {
                    tab.isActive = true;
                    selected = true;
                }
            });
        }
        
        if (!selected) {
            this.tabs[0].isActive = true;
        }
    }
}
</script>

