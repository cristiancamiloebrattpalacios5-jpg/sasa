try { require('fs').existsSync('.env') && require('dotenv').config() } catch {}

const express = require('express')
const cors    = require('cors')
const path    = require('path')
const app     = express()
const PORT    = process.env.PORT || 3000

// Webhook Stripe necesita raw body ANTES del json parser
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }))
app.use(cors())
app.use(express.json())

// Rutas API
app.use('/api/auth',          require('./src/routes/auth'))
app.use('/api/presentations', require('./src/routes/presentations'))
app.use('/api/payments',      require('./src/routes/payments'))

// Servir React compilado
const dist = path.join(__dirname, 'client', 'dist')
app.use(express.static(dist))
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 SlidAI corriendo → http://0.0.0.0:${PORT}\n`)

  const checks = [
    ['FIREBASE_SERVICE_ACCOUNT', 'Base de datos Firebase'],
    ['ANTHROPIC_API_KEY',        'Generación de slides con IA'],
    ['JWT_SECRET',               'Seguridad de sesiones'],
    ['STRIPE_SECRET_KEY',        'Pagos (opcional por ahora)'],
  ]
  let ok = true
  checks.forEach(([key, label]) => {
    if (process.env[key]) {
      console.log(`  ✅ ${label}`)
    } else {
      console.log(`  ⚠️  ${label} → falta ${key} en Secrets`)
      if (key !== 'STRIPE_SECRET_KEY') ok = false
    }
  })
  if (!ok) console.log('\n  👆 Agrega los Secrets que faltan y haz clic en Run de nuevo\n')
  else     console.log('\n  ✅ Todo listo. Abre el link de arriba en el navegador\n')
})
