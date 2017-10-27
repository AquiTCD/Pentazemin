<template>
  <svg width="128" height="128"></svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Doughnut',
  mounted() {
    let svg = d3.select(this.$el)
    let width = +svg.attr('width')
    let height = +svg.attr('height')
    let margin = { top: 8, left: 0, bottom: 8, right: 0 }
    let chartWidth = width - (margin.left + margin.right)
    let chartHeight = height - (margin.top + margin.bottom)
    this.chartLayer = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
    this.arc = d3
      .arc()
      .outerRadius(chartHeight / 2)
      .innerRadius(chartHeight / 5)
      .padAngle(0.02)
      .cornerRadius(3)
    this.pieG = this.chartLayer
      .append('g')
      .attr('transform', `translate(${chartWidth / 2}, ${chartHeight / 2})`)
    this.drawChart(this.data)
  },
  props: ['data'],
  watch: {
    data(newData) {
      this.drawChart(newData)
    },
  },
  methods: {
    drawChart(data) {
      let arcs = d3
        .pie()
        .sort(null)
        .value(function(d) {
          return d.value
        })(data)
      let block = this.pieG.selectAll('.arc').data(arcs)
      block.select('path').attr('d', this.arc)
      let newBlock = block
        .enter()
        .append('g')
        .classed('arc', true)
      newBlock
        .append('path')
        .attr('d', this.arc)
        .attr('id', function(d, i) {
          return 'arc-' + i
        })
        // .attr('stroke', 'gray')
        .attr('fill', d => d.data.color)
      newBlock
        .append('text')
        .attr('dx', 10)
        .attr('dy', -5)
        .append('textPath')
        .attr('xlink:href', function(d, i) {
          return '#arc-' + i
        })
        .text(function(d) {
          return d.data.name
        })
    },
  },
}
</script>
