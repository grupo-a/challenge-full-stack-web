import XLSX from 'xlsx'
 
export function exportExcell (items, nameArchive) {
  const data = XLSX.utils.json_to_sheet(items)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, data, 'data')
  XLSX.writeFile(wb, nameArchive + '.xlsx') 
}