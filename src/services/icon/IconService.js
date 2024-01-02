import { INSTALL_ICONS } from '@/icons'
import chunk from 'lodash/chunk'

/**
 * @param keywords {string}
 * @param colSize {number}
 * @returns {{id: number, icons: *}[]}
 */
export const filterIconsByKeywords = (keywords, colSize) => {
  let installIcons = INSTALL_ICONS
  if (keywords) {
    installIcons = installIcons.filter(icon => icon.toLowerCase().includes(keywords.toLowerCase()))
  }
  return chunk(installIcons, colSize).map((arr, idx) => {
    return {
      id: idx,
      icons: arr
    }
  })
}
