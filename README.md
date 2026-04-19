# SlidAI — Setup en Replit con Firebase

## PASO 1 — Crear proyecto en Firebase (5 min)

1. Ve a https://console.firebase.google.com
2. Clic en **"Agregar proyecto"** → ponle nombre "slidai" → continuar
3. Desactiva Google Analytics (no lo necesitas) → **Crear proyecto**
4. Cuando cargue, en el menú izquierdo ve a **Firestore Database**
5. Clic en **"Crear base de datos"** → elige **"Comenzar en modo de prueba"** → siguiente → listo

## PASO 2 — Obtener las credenciales de Firebase

1. En Firebase Console, clic en el ícono ⚙️ (Configuración) → **"Configuración del proyecto"**
2. Ve a la pestaña **"Cuentas de servicio"**
3. Clic en **"Generar nueva clave privada"** → confirmar
4. Se descarga un archivo `.json` — ábrelo con el Bloc de notas
5. Copia TODO el contenido de ese archivo (es un JSON largo)

## PASO 3 — Agregar Secrets en Replit

En Replit, busca el ícono de 🔒 **Secrets** en el panel izquierdo y agrega:

| Nombre del Secret         | Valor |
|--------------------------|-------|
| `FIREBASE_SERVICE_ACCOUNT` | Pega el JSON completo del paso 2 |
| `ANTHROPIC_API_KEY`        | Tu key de console.anthropic.com |
| `JWT_SECRET`               | Escribe cualquier texto largo: `miAppSlidAI2025superSecreta` |

> Stripe es opcional por ahora — puedes agregar `STRIPE_SECRET_KEY` y `STRIPE_PRICE_MONTHLY` después

## PASO 4 — Correr la app

Clic en el botón verde **▶ Run**

Espera ~2 minutos mientras instala todo.
Cuando diga `✅ Todo listo`, abre el link que aparece arriba en Replit.

## ¡Listo! La app está corriendo.

---

## Agregar Stripe después (para cobrar)

1. Crea cuenta en https://stripe.com
2. Ve a Developers → API Keys → copia `sk_test_...`
3. Ve a Products → crea "SlidAI PRO" con precio $9/mes → copia `price_...`
4. En Replit Secrets agrega:
   - `STRIPE_SECRET_KEY` = `sk_test_...`
   - `STRIPE_PRICE_MONTHLY` = `price_...`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_...` (de Stripe → Webhooks)
5. Clic en **Run** de nuevo
