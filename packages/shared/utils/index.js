/**
 * 共享工具函数
 */

export function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatCurrency(amount) {
  return `¥${amount.toFixed(2)}`
}

export function generateId() {
  return Math.random().toString(36).substring(2, 10)
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
