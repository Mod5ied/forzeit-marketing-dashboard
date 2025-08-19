import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'
import App from './App.vue'
import { dashboardData } from './api/mockData'

// Mock Chart.js
vi.mock('chart.js/auto', () => ({
  default: vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
  })),
}))

// Mock canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => ({
  fillStyle: '',
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({
    data: new Array(4),
  })),
  putImageData: vi.fn(),
  createImageData: vi.fn(() => []),
  setTransform: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  stroke: vi.fn(),
  translate: vi.fn(),
  scale: vi.fn(),
  rotate: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
  transform: vi.fn(),
  rect: vi.fn(),
  clip: vi.fn(),
}))

// Define the component's exposed properties type
interface AppInstance extends ComponentPublicInstance {
  liveStats: {
    activeNow: number
    last24Hours: number
    cardsCreated: number
  }
}

describe('App.vue', () => {
  let wrapper: VueWrapper<AppInstance> | undefined

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(App, {
      global: {
        stubs: {
          // Stub the Card components if they're causing issues
          Card: {
            template: '<div class="card-stub"><slot /></div>'
          },
          CardHeader: {
            template: '<div class="card-header-stub"><slot /></div>'
          },
          CardTitle: {
            template: '<div class="card-title-stub"><slot /></div>'
          },
          CardContent: {
            template: '<div class="card-content-stub"><slot /></div>'
          }
        }
      }
    }) as VueWrapper<AppInstance>
  })

  afterEach(() => {
    vi.useRealTimers()
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('renders the main dashboard title', () => {
    expect(wrapper!.find('h1').text()).toBe('Forzeit Dashboard')
  })

  it('displays the key metrics from dashboardData', () => {
    const appText = wrapper!.text()
    
    // Check for Total Revenue
    expect(appText).toContain('Total Revenue')
    expect(appText).toContain(`£${dashboardData.currentMRR.toLocaleString()}`)

    // Check for Annual Revenue
    expect(appText).toContain('Annual Revenue')
    expect(appText).toContain(`£${dashboardData.currentARR.toLocaleString()}`)

    // Check for Total Signups
    const totalSignups = dashboardData.signups.reduce((sum: any, val: any) => sum + val, 0)
    expect(appText).toContain('Total Signups')
    expect(appText).toContain(totalSignups.toString())
  })

  it('displays the initial live stats', () => {
    const appText = wrapper!.text()
    expect(appText).toContain('Live Activity')

    const liveStats = wrapper!.vm.liveStats
    expect(appText).toContain(liveStats.activeNow.toString())
    expect(appText).toContain(liveStats.last24Hours.toString())
    expect(appText).toContain(liveStats.cardsCreated.toString())
  })

  it('updates the live stats periodically', async () => {
    const initialLiveStats = { ...wrapper!.vm.liveStats }

    // Fast-forward time by 5 seconds
    vi.advanceTimersByTime(5000)
    await wrapper!.vm.$nextTick()

    const newLiveStats = wrapper!.vm.liveStats
    
    // At least one of the values should have changed
    const hasChanged = 
      newLiveStats.activeNow !== initialLiveStats.activeNow ||
      newLiveStats.last24Hours !== initialLiveStats.last24Hours ||
      newLiveStats.cardsCreated !== initialLiveStats.cardsCreated
    
    expect(hasChanged).toBe(true)
  })

  it('renders two chart canvases', () => {
    const canvases = wrapper!.findAll('canvas')
    expect(canvases).toHaveLength(2)
    
    // Check that refs are properly set
    expect(canvases[0].element).toBeDefined()
    expect(canvases[1].element).toBeDefined()
  })

  it('cleans up interval on unmount', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    
    wrapper!.unmount()
    
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })
})