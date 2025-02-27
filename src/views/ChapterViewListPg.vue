<template>
  <div class="page">
    <ChapterViewListCmp :chapter_list="bc_list"/>
  </div>
</template>

<script>
import ChapterViewListCmp from '@/components/ChapterViewListCmp.vue'
import { parseChapterListString } from '../utils/chapter';

export default {
  name: 'ChapterViewListPg',
  components: {
    ChapterViewListCmp
  },
  computed: {
    bc_list() {
      return parseChapterListString(this.$route.params.chapter_list);
    }
  }
}
</script>
<style scoped>
.page {
  width:100%;
}
</style >
