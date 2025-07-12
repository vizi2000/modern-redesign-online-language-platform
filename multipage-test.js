#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🧪 COMPREHENSIVE MULTI-PAGE TESTING - Akademia Poliglotki v3.0')
console.log('\n============================================================')
console.log('Starting multi-page architecture testing suite...\n')

let passedTests = 0
let totalTests = 0
const results = []

function runTest(testName, testFunction, category = 'General') {
  totalTests++
  const startTime = Date.now()
  
  try {
    const result = testFunction()
    const duration = Date.now() - startTime
    
    if (result === true || result === undefined) {
      console.log(`✅ ${testName} (${duration}ms)`)
      passedTests++
      results.push({
        name: testName,
        status: 'PASSED',
        duration,
        category
      })
      return true
    } else {
      console.log(`❌ ${testName} - ${result}`)
      results.push({
        name: testName,
        status: 'FAILED',
        duration,
        category,
        error: result
      })
      return false
    }
  } catch (error) {
    const duration = Date.now() - startTime
    console.log(`❌ ${testName} - ${error.message}`)
    results.push({
      name: testName,
      status: 'FAILED', 
      duration,
      category,
      error: error.message
    })
    return false
  }
}

// 📄 PAGE STRUCTURE TESTS
console.log('📄 PAGE STRUCTURE TESTS')
console.log('----------------------------------------')

runTest('HomePage component exists', () => {
  const homePage = path.join(__dirname, 'src', 'pages', 'HomePage.jsx')
  if (!fs.existsSync(homePage)) return 'HomePage.jsx not found'
  const content = fs.readFileSync(homePage, 'utf8')
  if (!content.includes('export default HomePage')) return 'HomePage export not found'
  return content.length > 1000 ? true : 'HomePage content too short'
}, 'Page Structure')

runTest('CoursesPage component exists', () => {
  const coursesPage = path.join(__dirname, 'src', 'pages', 'CoursesPage.jsx')
  if (!fs.existsSync(coursesPage)) return 'CoursesPage.jsx not found'
  const content = fs.readFileSync(coursesPage, 'utf8')
  return content.includes('export default CoursesPage')
}, 'Page Structure')

runTest('BlogPage component exists', () => {
  const blogPage = path.join(__dirname, 'src', 'pages', 'BlogPage.jsx')
  if (!fs.existsSync(blogPage)) return 'BlogPage.jsx not found'
  const content = fs.readFileSync(blogPage, 'utf8')
  return content.includes('export default BlogPage')
}, 'Page Structure')

runTest('MaterialsPage component exists', () => {
  const materialsPage = path.join(__dirname, 'src', 'pages', 'MaterialsPage.jsx')
  if (!fs.existsSync(materialsPage)) return 'MaterialsPage.jsx not found'
  const content = fs.readFileSync(materialsPage, 'utf8')
  return content.includes('export default MaterialsPage')
}, 'Page Structure')

runTest('TestPage component exists', () => {
  const testPage = path.join(__dirname, 'src', 'pages', 'TestPage.jsx')
  if (!fs.existsSync(testPage)) return 'TestPage.jsx not found'
  const content = fs.readFileSync(testPage, 'utf8')
  return content.includes('export default TestPage')
}, 'Page Structure')

runTest('BookingPage component exists', () => {
  const bookingPage = path.join(__dirname, 'src', 'pages', 'BookingPage.jsx')
  if (!fs.existsSync(bookingPage)) return 'BookingPage.jsx not found'
  const content = fs.readFileSync(bookingPage, 'utf8')
  return content.includes('export default BookingPage')
}, 'Page Structure')

runTest('PricingPage component exists', () => {
  const pricingPage = path.join(__dirname, 'src', 'pages', 'PricingPage.jsx')
  if (!fs.existsSync(pricingPage)) return 'PricingPage.jsx not found'
  const content = fs.readFileSync(pricingPage, 'utf8')
  return content.includes('export default PricingPage')
}, 'Page Structure')

runTest('ContactPage component exists', () => {
  const contactPage = path.join(__dirname, 'src', 'pages', 'ContactPage.jsx')
  if (!fs.existsSync(contactPage)) return 'ContactPage.jsx not found'
  const content = fs.readFileSync(contactPage, 'utf8')
  return content.includes('export default ContactPage')
}, 'Page Structure')

// 🧭 ROUTING TESTS
console.log('\n🧭 ROUTING TESTS')
console.log('----------------------------------------')

runTest('AppRouter component exists', () => {
  const appRouter = path.join(__dirname, 'src', 'AppRouter.jsx')
  if (!fs.existsSync(appRouter)) return 'AppRouter.jsx not found'
  const content = fs.readFileSync(appRouter, 'utf8')
  if (!content.includes('react-router-dom')) return 'React Router not imported'
  if (!content.includes('BrowserRouter')) return 'BrowserRouter not found'
  return content.includes('Routes') && content.includes('Route')
}, 'Routing')

runTest('Layout component exists', () => {
  const layout = path.join(__dirname, 'src', 'components', 'Layout.jsx')
  if (!fs.existsSync(layout)) return 'Layout.jsx not found'
  const content = fs.readFileSync(layout, 'utf8')
  if (!content.includes('useLocation')) return 'useLocation hook not found'
  return content.includes('export default Layout')
}, 'Routing')

runTest('All page routes configured', () => {
  const appRouter = path.join(__dirname, 'src', 'AppRouter.jsx')
  const content = fs.readFileSync(appRouter, 'utf8')
  
  const requiredRoutes = [
    'path="/"',
    'path="/kursy"',
    'path="/blog"', 
    'path="/materialy"',
    'path="/test-poziomu"',
    'path="/rezerwacja"',
    'path="/cennik"',
    'path="/kontakt"'
  ]
  
  for (const route of requiredRoutes) {
    if (!content.includes(route)) {
      return `Route ${route} not configured`
    }
  }
  return true
}, 'Routing')

runTest('React Router DOM installed', () => {
  const packageJson = path.join(__dirname, 'package.json')
  const content = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
  return content.dependencies['react-router-dom'] ? true : 'react-router-dom not installed'
}, 'Routing')

// 🎨 COMPONENT ARCHITECTURE TESTS
console.log('\n🎨 COMPONENT ARCHITECTURE TESTS')
console.log('----------------------------------------')

runTest('Shared Layout component', () => {
  const layout = path.join(__dirname, 'src', 'components', 'Layout.jsx')
  const content = fs.readFileSync(layout, 'utf8')
  
  const requiredElements = [
    'header',
    'footer', 
    'navigation',
    'GoogleAnalytics',
    'StickyMobileCTA',
    'Chatbot'
  ]
  
  let found = 0
  for (const element of requiredElements) {
    if (content.toLowerCase().includes(element.toLowerCase())) {
      found++
    }
  }
  
  return found >= 4 ? true : `Only ${found}/6 required elements found in Layout`
}, 'Component Architecture')

runTest('StructuredData component exists', () => {
  const structuredData = path.join(__dirname, 'src', 'components', 'StructuredData.jsx')
  if (!fs.existsSync(structuredData)) return 'StructuredData.jsx not found'
  const content = fs.readFileSync(structuredData, 'utf8')
  if (!content.includes('application/ld+json')) return 'JSON-LD structured data not found'
  return content.includes('schema.org')
}, 'Component Architecture')

runTest('Breadcrumb navigation in pages', () => {
  const pagesDir = path.join(__dirname, 'src', 'pages')
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.jsx'))
  
  let pagesWithBreadcrumbs = 0
  for (const file of pageFiles) {
    if (file === 'HomePage.jsx') continue // Homepage doesn't need breadcrumbs
    
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf8')
    if (content.includes('Powrót do strony głównej') || content.includes('ArrowLeft')) {
      pagesWithBreadcrumbs++
    }
  }
  
  const expectedPages = pageFiles.length - 1 // Excluding HomePage
  return pagesWithBreadcrumbs >= expectedPages ? true : `Only ${pagesWithBreadcrumbs}/${expectedPages} pages have breadcrumbs`
}, 'Component Architecture')

// 📊 SEO TESTS
console.log('\n📊 SEO TESTS') 
console.log('----------------------------------------')

runTest('Page titles implementation', () => {
  const pagesDir = path.join(__dirname, 'src', 'pages')
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.jsx'))
  
  let pagesWithTitles = 0
  for (const file of pageFiles) {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf8')
    if (content.includes('document.title') || content.includes('pageTitle')) {
      pagesWithTitles++
    }
  }
  
  return pagesWithTitles >= pageFiles.length - 1 ? true : `Only ${pagesWithTitles}/${pageFiles.length} pages have title configuration`
}, 'SEO')

runTest('Structured data for all page types', () => {
  const structuredData = path.join(__dirname, 'src', 'components', 'StructuredData.jsx')
  const content = fs.readFileSync(structuredData, 'utf8')
  
  const pageTypes = [
    "case '/':",
    "case '/kursy':",
    "case '/blog':",
    "case '/materialy':",
    "case '/test-poziomu':",
    "case '/cennik':",
    "case '/kontakt':"
  ]
  
  let configuredPages = 0
  for (const pageType of pageTypes) {
    if (content.includes(pageType)) {
      configuredPages++
    }
  }
  
  return configuredPages >= 7 ? true : `Only ${configuredPages}/7 page types have structured data`
}, 'SEO')

runTest('Open Graph meta tags in index.html', () => {
  const indexHtml = path.join(__dirname, 'index.html')
  const content = fs.readFileSync(indexHtml, 'utf8')
  
  const ogTags = [
    'og:title',
    'og:description', 
    'og:image',
    'og:url',
    'og:type'
  ]
  
  let foundTags = 0
  for (const tag of ogTags) {
    if (content.includes(tag)) {
      foundTags++
    }
  }
  
  return foundTags >= 4 ? true : `Only ${foundTags}/5 Open Graph tags found`
}, 'SEO')

// 🔧 BUILD & DEPLOYMENT TESTS
console.log('\n🔧 BUILD & DEPLOYMENT TESTS')
console.log('----------------------------------------')

runTest('Build configuration valid', () => {
  try {
    execSync('npm run build', { stdio: 'pipe', cwd: __dirname })
    return true
  } catch (error) {
    return `Build failed: ${error.message}`
  }
}, 'Build & Deployment')

runTest('Built assets exist', () => {
  const distDir = path.join(__dirname, 'dist')
  if (!fs.existsSync(distDir)) return 'dist directory not found'
  
  const indexHtml = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexHtml)) return 'index.html not found in dist'
  
  const assetsDir = path.join(distDir, 'assets')
  if (!fs.existsSync(assetsDir)) return 'assets directory not found'
  
  const assets = fs.readdirSync(assetsDir)
  const hasJS = assets.some(file => file.endsWith('.js'))
  const hasCSS = assets.some(file => file.endsWith('.css'))
  
  if (!hasJS) return 'No JS files found in assets'
  if (!hasCSS) return 'No CSS files found in assets'
  
  return true
}, 'Build & Deployment')

runTest('Bundle size analysis', () => {
  const assetsDir = path.join(__dirname, 'dist', 'assets')
  if (!fs.existsSync(assetsDir)) return 'Assets directory not found'
  
  const files = fs.readdirSync(assetsDir)
  const jsFiles = files.filter(file => file.endsWith('.js'))
  const cssFiles = files.filter(file => file.endsWith('.css'))
  
  if (jsFiles.length === 0) return 'No JS files found'
  if (cssFiles.length === 0) return 'No CSS files found'
  
  const jsSize = fs.statSync(path.join(assetsDir, jsFiles[0])).size
  const cssSize = fs.statSync(path.join(assetsDir, cssFiles[0])).size
  
  const jsSizeKB = Math.round(jsSize / 1024)
  const cssSizeKB = Math.round(cssSize / 1024)
  
  console.log(`   JS: ${jsSizeKB}KB, CSS: ${cssSizeKB}KB`)
  
  // Reasonable size limits for a comprehensive language learning platform
  if (jsSizeKB > 500) return `JS bundle too large: ${jsSizeKB}KB (should be < 500KB)`
  if (cssSizeKB > 100) return `CSS bundle too large: ${cssSizeKB}KB (should be < 100KB)`
  
  return true
}, 'Build & Deployment')

runTest('Docker configuration valid', () => {
  const dockerfile = path.join(__dirname, 'Dockerfile')
  if (!fs.existsSync(dockerfile)) return 'Dockerfile not found'
  
  const nginxConf = path.join(__dirname, 'nginx.conf') 
  if (!fs.existsSync(nginxConf)) return 'nginx.conf not found'
  
  const nginxContent = fs.readFileSync(nginxConf, 'utf8')
  if (!nginxContent.includes('try_files $uri $uri/ /index.html')) {
    return 'SPA routing not configured in nginx'
  }
  
  return true
}, 'Build & Deployment')

// 📱 MOBILE & UX TESTS
console.log('\n📱 MOBILE & UX TESTS')
console.log('----------------------------------------')

runTest('StickyMobileCTA component exists', () => {
  const stickyMobileCTA = path.join(__dirname, 'src', 'components', 'StickyMobileCTA.jsx')
  if (!fs.existsSync(stickyMobileCTA)) return 'StickyMobileCTA.jsx not found'
  const content = fs.readFileSync(stickyMobileCTA, 'utf8')
  if (!content.includes('md:hidden')) return 'Mobile-only styling not found'
  return content.includes('fixed bottom-0')
}, 'Mobile & UX')

runTest('Responsive navigation implementation', () => {
  const layout = path.join(__dirname, 'src', 'components', 'Layout.jsx')
  const content = fs.readFileSync(layout, 'utf8')
  
  if (!content.includes('md:hidden')) return 'Mobile menu button not found'
  if (!content.includes('hidden md:flex')) return 'Desktop navigation not found'
  if (!content.includes('isMenuOpen')) return 'Mobile menu state not managed'
  
  return true
}, 'Mobile & UX')

runTest('Accessibility features present', () => {
  const layout = path.join(__dirname, 'src', 'components', 'Layout.jsx')
  const content = fs.readFileSync(layout, 'utf8')
  
  // Check for basic accessibility features
  const accessibilityFeatures = [
    'alt=', // Image alt texts
    'aria-', // ARIA attributes  
    'role=', // Role attributes
    'tabindex' // Tab navigation
  ]
  
  let foundFeatures = 0
  for (const feature of accessibilityFeatures) {
    if (content.includes(feature)) {
      foundFeatures++
    }
  }
  
  return foundFeatures >= 1 ? true : 'No accessibility features found'
}, 'Mobile & UX')

// 📊 GENERATE REPORT
console.log('\n📊 TEST REPORT GENERATION')
console.log('============================================================')

const successRate = Math.round((passedTests / totalTests) * 100)
const categoryStats = {}

results.forEach(result => {
  if (!categoryStats[result.category]) {
    categoryStats[result.category] = { passed: 0, total: 0 }
  }
  categoryStats[result.category].total++
  if (result.status === 'PASSED') {
    categoryStats[result.category].passed++
  }
})

console.log(`\n📋 Test Report Summary:`)
console.log(`   Total Tests: ${totalTests}`)
console.log(`   Passed: ${passedTests} ✅`)
console.log(`   Failed: ${totalTests - passedTests} ❌`)
console.log(`   Success Rate: ${successRate}%`)

console.log(`\n📊 Category Breakdown:`)
Object.keys(categoryStats).forEach(category => {
  const stats = categoryStats[category]
  const categoryRate = Math.round((stats.passed / stats.total) * 100)
  console.log(`   ${category}: ${stats.passed}/${stats.total} (${categoryRate}%)`)
})

if (successRate >= 95) {
  console.log(`\n🟢 EXCELLENT! Multi-page architecture ready for production!`)
} else if (successRate >= 80) {
  console.log(`\n🟡 GOOD! Minor issues to address before production.`)
} else {
  console.log(`\n🔴 NEEDS WORK! Several issues need to be resolved.`)
}

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  version: 'v3.0.0-multipage',
  totalTests,
  passedTests,
  successRate,
  categoryStats,
  results
}

fs.writeFileSync(path.join(__dirname, 'MULTIPAGE_TEST_REPORT.json'), JSON.stringify(report, null, 2))

const markdownReport = `# Multi-Page Architecture Test Report

**Version:** v3.0.0-multipage  
**Date:** ${new Date().toISOString()}  
**Success Rate:** ${successRate}%  

## Summary
- **Total Tests:** ${totalTests}
- **Passed:** ${passedTests} ✅
- **Failed:** ${totalTests - passedTests} ❌

## Category Results
${Object.keys(categoryStats).map(category => {
  const stats = categoryStats[category]
  const rate = Math.round((stats.passed / stats.total) * 100)
  return `- **${category}:** ${stats.passed}/${stats.total} (${rate}%)`
}).join('\n')}

## Test Results
${results.map(result => 
  `- ${result.status === 'PASSED' ? '✅' : '❌'} **${result.name}** (${result.duration}ms)${result.error ? ` - ${result.error}` : ''}`
).join('\n')}

---
*Generated automatically by multipage-test.js*
`

fs.writeFileSync(path.join(__dirname, 'MULTIPAGE_TEST_REPORT.md'), markdownReport)

console.log(`\n📄 Reports saved:`)
console.log(`   - MULTIPAGE_TEST_REPORT.json (detailed)`)
console.log(`   - MULTIPAGE_TEST_REPORT.md (summary)`)

process.exit(successRate >= 95 ? 0 : 1)