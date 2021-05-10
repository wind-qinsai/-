const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/admin/home', // 对应的 path
        icon: 'home', // 图标名称
    },
    {
        title: '商品',
        key: '/admin/products',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/admin/category',
                icon: 'bars'
            },
            {
                title: '商品管理',
                key: '/admin/product',
                icon: 'tool'
            },
        ]
    },
    {
        title: '用户管理',
        key: '/admin/user',
        icon: 'user'
    },
    {
        title: '角色管理',
        key: '/admin/role',
        icon: 'safety',
    }
]
export default menuList