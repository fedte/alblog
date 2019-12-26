const WebLayout = () => import('@/template/web/layout')

const WebArticleInfo = () => import('@/template/web/article/article')
const WebArticleList = () => import('@/template/web/article/list')

const WebIndex = () => import('@/template/web/index')

const WebTagsList = () => import('@/template/web/tags/list')
const WebCatetoryList = () => import('@/template/web/catetory/list')

const WebLinksIndex = () => import('@/template/web/links/index')
const WebLinksList = () => import('@/template/web/links/list')

const WebGuestBook = () => import('@/template/web/guestbook/list')

export default [
  {
    path: '/',
    name: 'WebLayout',
    component: WebLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: WebIndex,
        alias: ['/']
      },
      {
        path: 'article/list',
        name: 'articleList',
        component: WebArticleList,
        alias: ['blog']
      },
      {
        path: 'article/:id',
        name: 'articleInfo',
        component: WebArticleInfo
      },
      {
        path: 'tags',
        name: 'tagsList',
        component: WebTagsList
      },
      {
        path: 'tags/:tag',
        name: 'tags',
        component: WebArticleList
      },
      {
        path: 'catetory',
        name: 'catetoryList',
        component: WebCatetoryList
      },
      {
        path: 'catetory/:id',
        name: 'catetory',
        component: WebArticleList
      },
      {
        path: 'links',
        name: 'linksList',
        component: WebLinksList
      },
      {
        path: 'links/:id',
        name: 'linksDetail',
        component: WebLinksIndex
      },
      {
        path: 'guestbook',
        name: 'guestBook',
        component: WebGuestBook
      }
    ]
  }
]
