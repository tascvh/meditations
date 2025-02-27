import { createRouter, createWebHistory } from 'vue-router'
import ChapterViewPg from '@/views/ChapterViewPg.vue'
import ChapterViewListPg from '@/views/ChapterViewListPg.vue'
import IndexPg from '@/views/IndexPg.vue'
import TagsPg from '@/views/TagsPg.vue'
import TagViewPg from '@/views/TagViewPg.vue'

const routes = [
  {
    path: '/meditations-:chapter',
    name: 'route_chapter',
    component: ChapterViewPg
  },
  {
    path: '/meditations/:chapter_list',
    name: 'route_chapter_list',
    component: ChapterViewListPg
  },
  {
    path: '/index',
    name: 'route_index',
    component: IndexPg
  },
  {
    path: '/tags',
    name: 'route_tags',
    component: TagsPg
  },
  {
    path: '/tag/:tag_text',
    name: 'route_tag',
    component: TagViewPg
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
