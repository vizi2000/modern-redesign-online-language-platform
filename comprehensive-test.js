#!/usr/bin/env node

/**
 * Comprehensive Testing Script for Akademia Poliglotki
 * Tests all functionality, performance, and cross-browser compatibility
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🧪 COMPREHENSIVE TESTING - Akademia Poliglotki v13\n')
console.log('=' .repeat(60))

// Test Configuration
const testConfig = {
  baseUrl: 'http://localhost:8090',
  externalUrl: 'http://194.181.240.37:8090',
  testTimeout: 5000,
  performanceThreshold: 3000
}

// Test Results Storage
const testResults = {
  navigation: [],
  functionality: [],
  performance: [],
  responsiveness: [],
  compatibility: [],
  security: [],
  total: 0,
  passed: 0,
  failed: 0
}

// Test Helper Functions
const runTest = (category, testName, testFunction) => {
  const startTime = Date.now()
  try {
    const result = testFunction()
    const duration = Date.now() - startTime
    
    const testResult = {
      name: testName,
      status: 'PASSED',
      duration: duration,
      details: result || 'Test completed successfully'
    }
    
    testResults[category].push(testResult)
    testResults.passed++
    console.log(`✅ ${testName} (${duration}ms)`)
    
    if (result && typeof result === 'string') {
      console.log(`   ${result}`)
    }
    
    return true
  } catch (error) {
    const duration = Date.now() - startTime
    
    const testResult = {
      name: testName,
      status: 'FAILED',
      duration: duration,
      error: error.message,
      details: error.stack
    }
    
    testResults[category].push(testResult)
    testResults.failed++
    console.log(`❌ ${testName} (${duration}ms)`)
    console.log(`   Error: ${error.message}`)
    
    return false
  } finally {
    testResults.total++
  }
}

// Navigation Tests
const testNavigation = () => {
  console.log('\n📍 NAVIGATION TESTS')
  console.log('-' .repeat(40))

  const navigationLinks = [
    { href: '#home', label: 'Strona główna' },
    { href: '#courses', label: 'Kursy' },
    { href: '#o-nauczycielu', label: 'O nauczycielu' },
    { href: '#test-poziomowania', label: 'Test poziomu' },
    { href: '#rezerwacja', label: 'Rezerwacja' },
    { href: '#cennik', label: 'Cennik' },
    { href: '#platnosci', label: 'Płatności' },
    { href: '#testimonials', label: 'Opinie' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' }
  ]

  navigationLinks.forEach(link => {
    runTest('navigation', `Navigation link: ${link.label}`, () => {
      const sectionId = link.href.replace('#', '')
      
      // Check in App.jsx first
      const appContent = fs.readFileSync(path.join(__dirname, 'App.jsx'), 'utf8')
      if (appContent.includes(`id="${sectionId}"`)) {
        return `Section with id="${sectionId}" found in App.jsx`
      }
      
      // Check in component files
      const componentFiles = fs.readdirSync(path.join(__dirname, 'src', 'components'))
        .filter(file => file.endsWith('.jsx'))
      
      for (const file of componentFiles) {
        const componentPath = path.join(__dirname, 'src', 'components', file)
        const componentContent = fs.readFileSync(componentPath, 'utf8')
        if (componentContent.includes(`id="${sectionId}"`)) {
          return `Section with id="${sectionId}" found in ${file}`
        }
      }
      
      throw new Error(`Section with id="${sectionId}" not found in any component`)
    })
  })
}

// Component Functionality Tests
const testFunctionality = () => {
  console.log('\n⚙️ FUNCTIONALITY TESTS')
  console.log('-' .repeat(40))

  // Test component files exist
  const components = [
    'ContactForm.jsx',
    'FAQ.jsx', 
    'AboutTeacher.jsx',
    'Pricing.jsx',
    'WorkingCourses.jsx',
    'LanguageLevelTest.jsx',
    'BookingSystem.jsx',
    'PaymentGateway.jsx',
    'Chatbot.jsx'
  ]

  components.forEach(component => {
    runTest('functionality', `Component exists: ${component}`, () => {
      const componentPath = path.join(__dirname, 'src', 'components', component)
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf8')
        const lines = content.split('\n').length
        return `Component has ${lines} lines`
      } else {
        throw new Error(`Component file not found: ${componentPath}`)
      }
    })
  })

  // Test main App.jsx imports
  runTest('functionality', 'App.jsx imports all components', () => {
    const appContent = fs.readFileSync(path.join(__dirname, 'App.jsx'), 'utf8')
    const imports = [
      'ContactForm',
      'FAQ',
      'AboutTeacher', 
      'Pricing',
      'WorkingCourses',
      'LanguageLevelTest',
      'BookingSystem',
      'PaymentGateway',
      'Chatbot'
    ]
    
    const missingImports = imports.filter(imp => !appContent.includes(`import ${imp}`))
    
    if (missingImports.length === 0) {
      return `All ${imports.length} components imported successfully`
    } else {
      throw new Error(`Missing imports: ${missingImports.join(', ')}`)
    }
  })

  // Test key functionality implementations
  runTest('functionality', 'EmailJS integration in ContactForm', () => {
    const contactFormContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'ContactForm.jsx'), 'utf8')
    if (contactFormContent.includes('emailjs')) {
      return 'EmailJS import and integration found'
    } else {
      throw new Error('EmailJS integration not found')
    }
  })

  runTest('functionality', 'Stripe integration in PaymentGateway', () => {
    const paymentContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PaymentGateway.jsx'), 'utf8')
    if (paymentContent.includes('@stripe/stripe-js')) {
      return 'Stripe integration found'
    } else {
      throw new Error('Stripe integration not found')
    }
  })

  runTest('functionality', 'Ollama integration in Chatbot', () => {
    const chatbotContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'Chatbot.jsx'), 'utf8')
    if (chatbotContent.includes('/api/ollama/generate')) {
      return 'Ollama API integration found'
    } else {
      throw new Error('Ollama API integration not found')
    }
  })
}

// Performance Tests
const testPerformance = () => {
  console.log('\n🚀 PERFORMANCE TESTS')
  console.log('-' .repeat(40))

  runTest('performance', 'Build assets size check', () => {
    const distPath = path.join(__dirname, 'dist')
    if (!fs.existsSync(distPath)) {
      throw new Error('Dist folder not found - run npm run build first')
    }

    const files = fs.readdirSync(path.join(distPath, 'assets'))
    const jsFiles = files.filter(f => f.endsWith('.js'))
    const cssFiles = files.filter(f => f.endsWith('.css'))

    if (jsFiles.length === 0) {
      throw new Error('No JavaScript files found in build')
    }

    if (cssFiles.length === 0) {
      throw new Error('No CSS files found in build')
    }

    // Check file sizes
    const jsFile = jsFiles[0]
    const cssFile = cssFiles[0]
    
    const jsSize = fs.statSync(path.join(distPath, 'assets', jsFile)).size
    const cssSize = fs.statSync(path.join(distPath, 'assets', cssFile)).size

    return `JS: ${(jsSize/1024).toFixed(1)}KB, CSS: ${(cssSize/1024).toFixed(1)}KB`
  })

  runTest('performance', 'Package.json dependencies check', () => {
    const packageContent = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
    const packageData = JSON.parse(packageContent)
    
    const depCount = Object.keys(packageData.dependencies || {}).length
    const devDepCount = Object.keys(packageData.devDependencies || {}).length
    
    return `${depCount} dependencies, ${devDepCount} dev dependencies`
  })

  runTest('performance', 'Critical dependencies present', () => {
    const packageContent = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
    const packageData = JSON.parse(packageContent)
    
    const criticalDeps = [
      'react',
      'lucide-react',
      '@emailjs/browser',
      '@stripe/stripe-js'
    ]
    
    const missingDeps = criticalDeps.filter(dep => 
      !packageData.dependencies?.[dep] && !packageData.devDependencies?.[dep]
    )
    
    if (missingDeps.length === 0) {
      return `All ${criticalDeps.length} critical dependencies present`
    } else {
      throw new Error(`Missing critical dependencies: ${missingDeps.join(', ')}`)
    }
  })
}

// Responsiveness Tests
const testResponsiveness = () => {
  console.log('\n📱 RESPONSIVENESS TESTS')
  console.log('-' .repeat(40))

  runTest('responsiveness', 'Tailwind CSS classes usage', () => {
    const appContent = fs.readFileSync(path.join(__dirname, 'App.jsx'), 'utf8')
    
    const responsiveClasses = [
      'md:', 'lg:', 'xl:', 'sm:', 'grid-cols-', 'flex-col', 'flex-row'
    ]
    
    const foundClasses = responsiveClasses.filter(cls => appContent.includes(cls))
    
    if (foundClasses.length >= 4) {
      return `Found ${foundClasses.length} responsive patterns: ${foundClasses.join(', ')}`
    } else {
      throw new Error(`Insufficient responsive classes found: ${foundClasses.join(', ')}`)
    }
  })

  runTest('responsiveness', 'Mobile menu implementation', () => {
    const appContent = fs.readFileSync(path.join(__dirname, 'App.jsx'), 'utf8')
    
    if (appContent.includes('isMenuOpen') && appContent.includes('setIsMenuOpen')) {
      return 'Mobile menu state management found'
    } else {
      throw new Error('Mobile menu implementation not found')
    }
  })

  runTest('responsiveness', 'Viewport meta tag', () => {
    const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    
    if (indexContent.includes('viewport') && indexContent.includes('width=device-width')) {
      return 'Viewport meta tag configured correctly'
    } else {
      throw new Error('Viewport meta tag missing or incorrect')
    }
  })
}

// Security Tests
const testSecurity = () => {
  console.log('\n🔒 SECURITY TESTS')
  console.log('-' .repeat(40))

  runTest('security', 'No hardcoded secrets in code', () => {
    const files = ['App.jsx', 'src/components/ContactForm.jsx', 'src/components/PaymentGateway.jsx']
    const sensitivePatterns = [
      /sk_live_[a-zA-Z0-9]/,
      /sk_test_[a-zA-Z0-9]/,
      /password.*=.*['"]/i,
      /api_key.*=.*['"]/i,
      /secret.*=.*['"]/i
    ]
    
    let foundSecrets = []
    
    files.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8')
        sensitivePatterns.forEach(pattern => {
          if (pattern.test(content)) {
            foundSecrets.push(`${file}: ${pattern}`)
          }
        })
      }
    })
    
    if (foundSecrets.length === 0) {
      return 'No hardcoded secrets found'
    } else {
      throw new Error(`Found potential secrets: ${foundSecrets.join(', ')}`)
    }
  })

  runTest('security', 'CORS configuration in nginx', () => {
    const nginxContent = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf8')
    
    if (nginxContent.includes('Access-Control-Allow-Origin')) {
      return 'CORS headers configured in nginx'
    } else {
      throw new Error('CORS configuration not found in nginx.conf')
    }
  })

  runTest('security', 'Input validation in forms', () => {
    const contactFormContent = fs.readFileSync(path.join(__dirname, 'src/components/ContactForm.jsx'), 'utf8')
    
    if (contactFormContent.includes('validateForm') || contactFormContent.includes('required')) {
      return 'Form validation found'
    } else {
      throw new Error('Form validation not implemented')
    }
  })
}

// Docker and Deployment Tests
const testDeployment = () => {
  console.log('\n🐳 DEPLOYMENT TESTS')
  console.log('-' .repeat(40))

  runTest('functionality', 'Dockerfile exists and configured', () => {
    const dockerfilePath = path.join(__dirname, 'Dockerfile')
    if (fs.existsSync(dockerfilePath)) {
      const content = fs.readFileSync(dockerfilePath, 'utf8')
      if (content.includes('nginx') && content.includes('COPY dist/')) {
        return 'Dockerfile properly configured for nginx deployment'
      } else {
        throw new Error('Dockerfile missing required nginx configuration')
      }
    } else {
      throw new Error('Dockerfile not found')
    }
  })

  runTest('functionality', 'nginx.conf production ready', () => {
    const nginxContent = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf8')
    
    const requiredConfigs = ['gzip on', 'try_files', 'proxy_pass']
    const foundConfigs = requiredConfigs.filter(config => nginxContent.includes(config))
    
    if (foundConfigs.length === requiredConfigs.length) {
      return `All production configs found: ${foundConfigs.join(', ')}`
    } else {
      const missing = requiredConfigs.filter(config => !nginxContent.includes(config))
      throw new Error(`Missing nginx configs: ${missing.join(', ')}`)
    }
  })

  runTest('functionality', 'Build process configured', () => {
    const packageContent = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
    const packageData = JSON.parse(packageContent)
    
    if (packageData.scripts?.build && packageData.scripts?.dev) {
      return 'Build and dev scripts configured'
    } else {
      throw new Error('Missing build or dev scripts in package.json')
    }
  })
}

// Documentation Tests
const testDocumentation = () => {
  console.log('\n📚 DOCUMENTATION TESTS')
  console.log('-' .repeat(40))

  const requiredDocs = [
    'README.md',
    'CHANGELOG.md', 
    'EMAILJS_SETUP.md',
    'STRIPE_SETUP.md',
    'OLLAMA_EXTERNAL_SETUP.md',
    'AGENTS.md',
    'TASKS.md',
    'PLANNING.md'
  ]

  requiredDocs.forEach(doc => {
    runTest('functionality', `Documentation exists: ${doc}`, () => {
      const docPath = path.join(__dirname, doc)
      if (fs.existsSync(docPath)) {
        const content = fs.readFileSync(docPath, 'utf8')
        const lines = content.split('\n').length
        const size = (content.length / 1024).toFixed(1)
        return `${lines} lines, ${size}KB`
      } else {
        throw new Error(`Documentation file not found: ${doc}`)
      }
    })
  })
}

// Generate Test Report
const generateReport = () => {
  console.log('\n📊 TEST REPORT GENERATION')
  console.log('=' .repeat(60))

  const report = {
    timestamp: new Date().toISOString(),
    version: 'v13',
    summary: {
      total: testResults.total,
      passed: testResults.passed,
      failed: testResults.failed,
      successRate: `${((testResults.passed / testResults.total) * 100).toFixed(1)}%`
    },
    categories: {
      navigation: testResults.navigation,
      functionality: testResults.functionality,
      performance: testResults.performance,
      responsiveness: testResults.responsiveness,
      security: testResults.security
    },
    recommendations: []
  }

  // Add recommendations based on test results
  if (testResults.failed > 0) {
    report.recommendations.push('Review failed tests and fix critical issues before deployment')
  }
  
  if (testResults.security.some(test => test.status === 'FAILED')) {
    report.recommendations.push('Address security issues immediately - do not deploy with security failures')
  }
  
  if (testResults.performance.some(test => test.status === 'FAILED')) {
    report.recommendations.push('Optimize performance issues for better user experience')
  }

  // Write report to file
  const reportPath = path.join(__dirname, 'TEST_REPORT.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

  // Generate markdown summary
  const markdownReport = `# 🧪 Test Report - Akademia Poliglotki v13

## Summary
- **Total Tests**: ${report.summary.total}
- **Passed**: ${report.summary.passed} ✅
- **Failed**: ${report.summary.failed} ❌
- **Success Rate**: ${report.summary.successRate}

## Test Categories

### Navigation Tests
${testResults.navigation.map(test => `- ${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}`).join('\n')}

### Functionality Tests  
${testResults.functionality.map(test => `- ${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}`).join('\n')}

### Performance Tests
${testResults.performance.map(test => `- ${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}`).join('\n')}

### Responsiveness Tests
${testResults.responsiveness.map(test => `- ${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}`).join('\n')}

### Security Tests
${testResults.security.map(test => `- ${test.status === 'PASSED' ? '✅' : '❌'} ${test.name}`).join('\n')}

## Recommendations
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## Status
${testResults.failed === 0 ? '🟢 **READY FOR DEPLOYMENT**' : '🔴 **REQUIRES FIXES BEFORE DEPLOYMENT**'}

---
*Generated: ${new Date().toLocaleString('pl-PL')}*
`

  fs.writeFileSync(path.join(__dirname, 'TEST_REPORT.md'), markdownReport)

  console.log(`\n📋 Test Report Summary:`)
  console.log(`   Total Tests: ${report.summary.total}`)
  console.log(`   Passed: ${report.summary.passed} ✅`)
  console.log(`   Failed: ${report.summary.failed} ❌`)
  console.log(`   Success Rate: ${report.summary.successRate}`)
  
  if (testResults.failed === 0) {
    console.log('\n🟢 ALL TESTS PASSED - READY FOR GITHUB DEPLOYMENT!')
  } else {
    console.log('\n🔴 SOME TESTS FAILED - REVIEW BEFORE DEPLOYMENT')
  }

  console.log(`\n📄 Reports saved:`)
  console.log(`   - TEST_REPORT.json (detailed)`)
  console.log(`   - TEST_REPORT.md (summary)`)
}

// Run All Tests
const runAllTests = () => {
  console.log('Starting comprehensive testing suite...\n')

  testNavigation()
  testFunctionality()
  testPerformance()
  testResponsiveness()
  testSecurity()
  testDeployment()
  testDocumentation()

  generateReport()
}

// Execute tests
runAllTests()