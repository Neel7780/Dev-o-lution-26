// lib/mobile-optimization.ts
// Utility for detecting device capabilities and optimizing animations for mobile

interface DeviceCapabilities {
  isMobile: boolean
  isLowEndDevice: boolean
  prefersReducedMotion: boolean
  supportsWebGL: boolean
  deviceMemory: number
  hardwareConcurrency: number
}

export const getDeviceCapabilities = (): DeviceCapabilities => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLowEndDevice: false,
      prefersReducedMotion: false,
      supportsWebGL: false,
      deviceMemory: 8,
      hardwareConcurrency: 4,
    }
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Check for WebGL support
  const canvas = document.createElement('canvas')
  const supportsWebGL = !!(
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  )

  // Device memory (GB) - lower means less capable
  const deviceMemory = (navigator as any).deviceMemory || 8

  // CPU cores - lower means less capable
  const hardwareConcurrency = navigator.hardwareConcurrency || 4

  // Consider low-end if: mobile + (low memory OR few cores)
  const isLowEndDevice = isMobile && (deviceMemory <= 4 || hardwareConcurrency <= 4)

  return {
    isMobile,
    isLowEndDevice,
    prefersReducedMotion,
    supportsWebGL,
    deviceMemory,
    hardwareConcurrency,
  }
}

export const getOptimizedAnimationConfig = () => {
  const capabilities = getDeviceCapabilities()

  if (capabilities.prefersReducedMotion) {
    return {
      duration: 0.1,
      ease: 'none',
      enableComplexAnimations: false,
      enableParallax: false,
      enableFloatingAnimations: false,
      particleCount: 0,
      scrubAmount: 0,
    }
  }

  if (capabilities.isLowEndDevice) {
    return {
      duration: 0.4, // Faster animations
      ease: 'power2.out',
      enableComplexAnimations: false,
      enableParallax: false,
      enableFloatingAnimations: false,
      particleCount: 5, // Minimal particles
      scrubAmount: 0.5, // Less smooth but more performant
    }
  }

  if (capabilities.isMobile) {
    return {
      duration: 0.5,
      ease: 'power2.out',
      enableComplexAnimations: false,
      enableParallax: false,
      enableFloatingAnimations: true,
      particleCount: 8, // Reduced particles
      scrubAmount: 0.8,
    }
  }

  // Desktop - full animations
  return {
    duration: 0.8,
    ease: 'power3.out',
    enableComplexAnimations: true,
    enableParallax: true,
    enableFloatingAnimations: true,
    particleCount: 15,
    scrubAmount: 1,
  }
}

export const shouldDisableAnimation = (animationType: 'complex' | 'parallax' | 'floating'): boolean => {
  const config = getOptimizedAnimationConfig()

  switch (animationType) {
    case 'complex':
      return !config.enableComplexAnimations
    case 'parallax':
      return !config.enableParallax
    case 'floating':
      return !config.enableFloatingAnimations
    default:
      return false
  }
}

// Throttle scroll events on mobile
export const getScrollThrottle = (): number => {
  const { isMobile, isLowEndDevice } = getDeviceCapabilities()
  
  if (isLowEndDevice) return 100 // 10fps
  if (isMobile) return 50 // 20fps
  return 16 // 60fps on desktop
}

// Get optimal RAF interval
export const getRAFInterval = (): number => {
  const { isMobile, isLowEndDevice } = getDeviceCapabilities()
  
  if (isLowEndDevice) return 3 // ~20fps
  if (isMobile) return 2 // ~30fps
  return 1 // 60fps on desktop
}
