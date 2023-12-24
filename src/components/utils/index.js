const calcWithIf = menuItem => {
  ['icon', 'labelKey', 'label', 'html'].forEach(key => {
    const keyIf = menuItem[`${key}If`]
    if (keyIf) {
      menuItem[key] = keyIf(menuItem)
    }
  })
}
export const filterMenus = menus => menus.filter(menu => !menu.disabled)
  .map(menu => {
    calcWithIf(menu)
    if (menu.children && menu.children.length) {
      menu.children = filterMenus(menu.children)
    }
    return menu
  })
