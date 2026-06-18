<template>
  <div class="statistics-page">
    <h2>统计概览</h2>
    <p class="page-desc">系统核心指标与数据趋势</p>

    <div class="stats-grid">
      <div class="stat-card primary">
        <span class="stat-icon">👥</span>
        <div class="stat-info">
          <div class="stat-value">1,280</div>
          <div class="stat-label">用户总数</div>
          <div class="stat-trend up">↑ 12.5%</div>
        </div>
      </div>
      <div class="stat-card success">
        <span class="stat-icon">📦</span>
        <div class="stat-info">
          <div class="stat-value">3,560</div>
          <div class="stat-label">订单总数</div>
          <div class="stat-trend up">↑ 8.3%</div>
        </div>
      </div>
      <div class="stat-card warning">
        <span class="stat-icon">💰</span>
        <div class="stat-info">
          <div class="stat-value">¥128,000</div>
          <div class="stat-label">总营收</div>
          <div class="stat-trend up">↑ 15.2%</div>
        </div>
      </div>
      <div class="stat-card info">
        <span class="stat-icon">📈</span>
        <div class="stat-info">
          <div class="stat-value">98.2%</div>
          <div class="stat-label">系统健康度</div>
          <div class="stat-trend stable">→ 稳定</div>
        </div>
      </div>
    </div>

    <div class="data-section">
      <h3>子系统运行状态</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>子系统</th>
            <th>模块数</th>
            <th>今日请求量</th>
            <th>平均响应</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="tag tag-host">Host</span> 主系统</td>
            <td>5</td>
            <td>12,430</td>
            <td>45ms</td>
            <td><span class="status online"></span> 正常</td>
          </tr>
          <tr>
            <td><span class="tag tag-order">Order</span> 订单子系统</td>
            <td>3</td>
            <td>8,290</td>
            <td>62ms</td>
            <td><span class="status online"></span> 正常</td>
          </tr>
          <tr>
            <td><span class="tag tag-user">User</span> 用户子系统</td>
            <td>3</td>
            <td>5,810</td>
            <td>38ms</td>
            <td><span class="status online"></span> 正常</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h4>请求趋势（近7天）</h4>
        <div class="bar-chart">
          <div class="bar-item" v-for="(item, i) in barData" :key="i">
            <div class="bar" :style="{ height: item.value + '%' }"></div>
            <span class="bar-label">{{ item.day }}</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h4>模块调用占比</h4>
        <div class="pie-simple">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#1890ff" stroke-width="20"
              stroke-dasharray="78.5 31.4" stroke-dashoffset="0" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#722ed1" stroke-width="20"
              stroke-dasharray="52.3 188.5" stroke-dashoffset="-78.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#52c41a" stroke-width="20"
              stroke-dasharray="39.3 188.5" stroke-dashoffset="-130.8" />
          </svg>
          <div class="pie-legend">
            <span><i class="dot" style="background:#1890ff"></i>主系统 42%</span>
            <span><i class="dot" style="background:#722ed1"></i>订单 33%</span>
            <span><i class="dot" style="background:#52c41a"></i>用户 25%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const barData = reactive([
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 72 },
  { day: 'Sat', value: 45 },
  { day: 'Sun', value: 38 }
])
</script>

<style scoped>
.statistics-page { max-width: 1200px; }
.statistics-page h2 { margin-bottom: 4px; color: #1a1a1a; }
.page-desc { color: #888; margin-bottom: 24px; font-size: 14px; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border-left: 4px solid transparent;
}
.stat-card.primary { border-left-color: #1890ff; }
.stat-card.success { border-left-color: #52c41a; }
.stat-card.warning { border-left-color: #faad14; }
.stat-card.info   { border-left-color: #722ed1; }

.stat-icon { font-size: 36px; }
.stat-value { font-size: 26px; font-weight: 700; color: #1a1a1a; }
.stat-label { font-size: 13px; color: #888; margin-top: 2px; }
.stat-trend { font-size: 12px; margin-top: 2px; }
.stat-trend.up { color: #52c41a; }
.stat-trend.stable { color: #888; }

.data-section { margin-bottom: 28px; }
.data-section h3 { font-size: 16px; color: #333; margin-bottom: 12px; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.data-table th, .data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}
.data-table th { background: #fafafa; color: #666; font-weight: 600; }
.data-table tbody tr:hover { background: #fafafa; }

.tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-right: 8px; }
.tag-host  { background: #e6f7ff; color: #1890ff; }
.tag-order { background: #f9f0ff; color: #722ed1; }
.tag-user  { background: #f6ffed; color: #52c41a; }

.status { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; }
.status.online { background: #52c41a; }

.charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.chart-card h4 { margin-bottom: 16px; color: #333; font-size: 15px; }

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 180px;
  padding: 0 10px;
}
.bar-item { display: flex; flex-direction: column; align-items: center; }
.bar {
  width: 36px;
  background: linear-gradient(180deg, #1890ff, #69c0ff);
  border-radius: 4px 4px 0 0;
  min-height: 6px;
}
.bar-label { margin-top: 6px; font-size: 11px; color: #999; }

.pie-simple { text-align: center; }
.pie-simple svg { width: 160px; height: 160px; transform: rotate(-90deg); }
.pie-legend { display: flex; gap: 16px; justify-content: center; margin-top: 12px; font-size: 12px; color: #666; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 4px; vertical-align: middle; }
</style>
