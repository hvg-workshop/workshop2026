import viteConfig from '../../vite.config.js'

describe('Vite deployment config', () => {
  it('uses the GitHub Pages repository subpath as the base URL', () => {
    expect(viteConfig.base).toBe('/workshop2026/')
  })
})
