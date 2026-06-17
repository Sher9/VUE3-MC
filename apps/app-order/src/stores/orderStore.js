import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([
    { id: 1, orderNo: 'ORD2024001', customerName: '张三', amount: 299.00, status: 'completed', createTime: '2024-01-15' },
    { id: 2, orderNo: 'ORD2024002', customerName: '李四', amount: 599.00, status: 'processing', createTime: '2024-01-16' },
    { id: 3, orderNo: 'ORD2024003', customerName: '王五', amount: 129.00, status: 'pending', createTime: '2024-01-17' },
    { id: 4, orderNo: 'ORD2024004', customerName: '赵六', amount: 899.00, status: 'completed', createTime: '2024-01-18' },
    { id: 5, orderNo: 'ORD2024005', customerName: '钱七', amount: 199.00, status: 'cancelled', createTime: '2024-01-19' }
  ])

  const currentOrder = ref(null)

  function getOrderById(id) {
    return orders.value.find(o => o.id === id)
  }

  function getOrdersByStatus(status) {
    return orders.value.filter(o => o.status === status)
  }

  function addOrder(order) {
    const newOrder = {
      ...order,
      id: orders.value.length + 1
    }
    orders.value.push(newOrder)
  }

  return {
    orders,
    currentOrder,
    getOrderById,
    getOrdersByStatus,
    addOrder
  }
})
