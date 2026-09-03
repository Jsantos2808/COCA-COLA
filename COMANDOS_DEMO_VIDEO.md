# 🔧 COMANDOS PARA DEMOSTRACIÓN EN VIDEO

## ANTES DE GRABAR - Preparación

```bash
# Terminal 1: Asegúrate que el servidor esté corriendo
cd "c:\Users\JOSE\Desktop\SANTOS\ANALISIS DE SISTEMAS II\x\producto_software"
npm start

# Debería mostrar:
# Coca-Cola Stock Portal escuchando en http://localhost:3000
```

---

## EN EL VIDEO - Secciones y Comandos

### SECCIÓN 1: DEMOSTRACIÓN DE UI (0:15 - 0:50)

**En el navegador:**
1. Abre: `http://localhost:3000`
2. Ve el listado de productos
3. Haz clic en "Dar entrada" en Coca-Cola Original
   - Ingresa cantidad: `20`
   - El stock debe subir de 150 a 170
4. Haz clic en "Despachar" en Sprite
   - Ingresa cantidad: `5`
   - El stock debe bajar de 45 a 40
5. Haz clic en "Refrescar stock"
   - Los datos deben mantenerse (persistencia)

**Lo que el evaluador ve:**
- Interfaz limpia y funcional ✅
- Operaciones en tiempo real ✅
- Datos persistentes ✅

---

### SECCIÓN 2: GITHUB ACTIONS (0:50 - 1:40)

**En el navegador:**
1. Abre: `https://github.com/Jsantos2808/COCA-COLA`
2. Haz clic en "Actions" (en la barra superior)
3. Selecciona el workflow más reciente (el que tiene ✅ verde)
4. Haz clic en el job "Build, Test y Analisis"
5. Expande cada paso y muestra:
   - ✅ "npm install" completado
   - ✅ "npm test" - "22 passed"
   - ✅ "Coverage report" generado
   - ✅ "SonarCloud" scan completado

**Lo que el evaluador ve:**
- Automatización real de CI/CD ✅
- Tests ejecutándose automáticamente ✅
- Análisis de calidad integrado ✅

---

### SECCIÓN 3: TESTING AUTOMATIZADO (1:40 - 2:25)

**En VS Code / Terminal:**

```bash
# Terminal 2: Abre una nueva terminal
cd "c:\Users\JOSE\Desktop\SANTOS\ANALISIS DE SISTEMAS II\x\producto_software"

# Ejecuta las pruebas
npm test

# Debería mostrar:
# PASS  tests/app.test.js
# PASS  tests/database.test.js
# PASS  tests/error.test.js
# 
# Test Suites: 3 passed, 3 total
# Tests:       22 passed, 22 total
```

**Luego ejecuta con cobertura:**

```bash
npm test -- --coverage

# Debería mostrar tabla de cobertura:
# All files          |   70.23 |    77.14 |      50 |    71.5
# Esto significa:
# - 70% cobertura de sentencias
# - 77% de branches
```

**Lo que el evaluador ve:**
- Testing completo y automatizado ✅
- Alta cobertura de código ✅
- Calidad garantizada ✅

---

### SECCIÓN 4: PUNTOS CLAVE ADICIONALES (2:25 - 2:55)

#### Punto 1: Git Hooks Pre-Push

**En VS Code - Abre archivo:**
```
.githooks/pre-push
```

**Muestra el contenido** (ya debe estar allí)
- Explica: "Antes de permitir un push a GitHub, se ejecutan los tests"
- Si algo falla, el commit se rechaza automáticamente

#### Punto 2: Adaptabilidad - SQLite → JSON

**En VS Code - Abre archivo:**
```
src/db/database.js
```

**Muestra y comenta:**
```javascript
// Línea 3-8: INITIAL_PRODUCTS
// Línea 26-30: Lee datos de archivo JSON
// Línea 32-34: Guarda en archivo JSON

class SimpleDatabase {
  // Esto es una base de datos flexible que no requiere compilación nativa
  // Solucioné problemas evitando dependencias problemáticas
}
```

**Lo que dices:**
"Inicialmente el proyecto usaba SQLite, pero enfrenté problemas de compilación en Windows. En lugar de fallar, refactoricé a JSON manteniendo la misma API. Esto demuestra **problem-solving** real."

#### Punto 3: Quality Gates SonarCloud

**En el navegador - Vuelve a GitHub Actions:**
1. En el workflow exitoso, busca el paso: "Escaneo de calidad SonarCloud"
2. Muestra el resultado: "Quality Gate: PASSED" ✅

**Lo que dices:**
"SonarCloud valida no solo que el código funcione, sino que cumpla con estándares de calidad. Cobertura mínima, duplicación de código, vulnerabilidades. Si no cumple, el deploy se rechaza."

---

## COMANDOS RÁPIDOS (Copiar-Pegar)

```bash
# Iniciar servidor
npm start

# Ejecutar tests sin cobertura (rápido)
npm test

# Ejecutar tests con cobertura (más lento)
npm test -- --coverage

# Verificar estructura del proyecto
tree src

# Ver últimos commits
git log --oneline -5

# Ver archivo de configuración CI/CD
cat .github/workflows/ci.yml
```

---

## URLS NECESARIAS

Abre estas en el navegador **ANTES** de grabar:

```
Local:
- http://localhost:3000  (aplicación)

GitHub:
- https://github.com/Jsantos2808/COCA-COLA  (repositorio)
- https://github.com/Jsantos2808/COCA-COLA/actions  (workflows)

(Opcional - solo si tienes acceso):
- https://sonarcloud.io  (analysis)
```

---

## PROBLEMAS POSIBLES Y SOLUCIONES

### Si el servidor no corre
```bash
# Limpia cache y reinstala
rm -r node_modules package-lock.json
npm install
npm start
```

### Si npm test falla
```bash
# Verifica que tengas Node.js 24
node --version  # Debe ser v24.x.x

# Reinstala dependencias
npm ci
```

### Si GitHub Actions no muestra workflows
```bash
# Haz un push nuevo para disparar el workflow
git commit --allow-empty -m "test: trigger CI"
git push origin main
```

---

## ⏱️ TIMING PERFECTO

| Sección | Tiempo | Comando/Acción |
|---------|--------|---|
| Intro | 0:00-0:15 | Habla presentando |
| UI Demo | 0:15-0:50 | Click en botones, agregar/despachar stock |
| GitHub Actions | 0:50-1:40 | Navega a Actions, muestra workflow |
| npm test | 1:40-2:25 | Ejecuta tests, muestra cobertura |
| Puntos Clave | 2:25-2:55 | Muestra Git hooks, database.js, Quality Gate |
| Cierre | 2:55-3:00 | Conclusión |

**Total: 3 minutos exactos** ⏰

---

## 📸 SCREENSHOTS PARA REFERENCIA

Mientras grabas, ten abiertos estos elementos:
1. ✅ Navegador con localhost:3000
2. ✅ VS Code con proyecto
3. ✅ GitHub Actions tab
4. ✅ Terminal con npm test resultado

---

**¡Ya estás listo para grabar!** 🎥
