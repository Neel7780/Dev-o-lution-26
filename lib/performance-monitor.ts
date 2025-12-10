// lib/performance-monitor.ts
// Performance monitoring utility for tracking animations and memory usage

interface PerformanceMetric {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  memory?: {
    before: number
    after: number
    delta: number
  }
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map()
  private animationFrames: number[] = []
  private memorySnapshots: number[] = []

  /**
   * Start tracking a metric
   */
  startMetric(name: string): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      memory: {
        before: (performance as any).memory?.usedJSHeapSize || 0,
        after: 0,
        delta: 0,
      },
    })
  }

  /**
   * End tracking a metric
   */
  endMetric(name: string): void {
    const metric = this.metrics.get(name)
    if (metric) {
      metric.endTime = performance.now()
      metric.duration = metric.endTime - metric.startTime

      if (metric.memory) {
        metric.memory.after = (performance as any).memory?.usedJSHeapSize || 0
        metric.memory.delta = metric.memory.after - metric.memory.before
      }

      console.log(`[PERF] ${name}: ${metric.duration.toFixed(2)}ms`, {
        memory: metric.memory?.delta,
      })
    }
  }

  /**
   * Monitor FPS during animation
   */
  monitorFPS(duration: number = 5000): Promise<number> {
    return new Promise((resolve) => {
      let frameCount = 0
      let lastTime = performance.now()
      const startTime = lastTime

      const countFrame = () => {
        frameCount++
        const now = performance.now()

        if (now - startTime > duration) {
          const avgFPS = (frameCount / (now - startTime)) * 1000
          console.log(`[FPS] Average FPS: ${avgFPS.toFixed(2)}`)
          resolve(avgFPS)
        } else {
          requestAnimationFrame(countFrame)
        }
      }

      requestAnimationFrame(countFrame)
    })
  }

  /**
   * Get memory usage
   */
  getMemoryUsage(): {
    used: number
    limit: number
    percentage: number
  } | null {
    const memory = (performance as any).memory

    if (!memory) {
      console.warn(
        '[PERF] Memory API not available. Use Chrome with --enable-precise-memory-info flag'
      )
      return null
    }

    return {
      used: memory.usedJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    }
  }

  /**
   * Log all collected metrics
   */
  logMetrics(): void {
    console.group('[PERF] Performance Metrics')
    this.metrics.forEach((metric) => {
      console.log(`${metric.name}:`, {
        duration: `${metric.duration?.toFixed(2)}ms`,
        memory: metric.memory?.delta,
      })
    })
    console.groupEnd()
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear()
    this.animationFrames = []
    this.memorySnapshots = []
  }

  /**
   * Check for memory leaks by monitoring growth over time
   */
  monitorMemoryGrowth(interval: number = 1000, duration: number = 10000): Promise<{
    startMemory: number
    endMemory: number
    growth: number
    growthPercentage: number
  }> {
    return new Promise((resolve) => {
      const startMemory = (performance as any).memory?.usedJSHeapSize || 0
      let currentMemory = startMemory
      let measurements = 0
      const maxMeasurements = Math.ceil(duration / interval)

      const checkMemory = () => {
        currentMemory = (performance as any).memory?.usedJSHeapSize || 0
        measurements++

        if (measurements >= maxMeasurements) {
          const growth = currentMemory - startMemory
          const growthPercentage = (growth / startMemory) * 100

          console.log(
            `[MEMORY] Growth: ${(growth / 1024 / 1024).toFixed(2)}MB (${growthPercentage.toFixed(2)}%)`
          )

          resolve({
            startMemory,
            endMemory: currentMemory,
            growth,
            growthPercentage,
          })
        } else {
          setTimeout(checkMemory, interval)
        }
      }

      checkMemory()
    })
  }

  /**
   * Generate performance report
   */
  generateReport(): string {
    const memory = this.getMemoryUsage()
    let report = '=== PERFORMANCE REPORT ===\n\n'

    if (memory) {
      report += `Memory Usage:\n`
      report += `  Used: ${(memory.used / 1024 / 1024).toFixed(2)}MB\n`
      report += `  Limit: ${(memory.limit / 1024 / 1024).toFixed(2)}MB\n`
      report += `  Usage: ${memory.percentage.toFixed(2)}%\n\n`
    }

    report += `Metrics:\n`
    this.metrics.forEach((metric) => {
      report += `  ${metric.name}: ${metric.duration?.toFixed(2)}ms`
      if (metric.memory?.delta) {
        report += ` (Memory: ${(metric.memory.delta / 1024).toFixed(2)}KB)`
      }
      report += '\n'
    })

    return report
  }
}

// Export singleton instance
export const perfMonitor = new PerformanceMonitor()

// Export class for custom instances
export default PerformanceMonitor
