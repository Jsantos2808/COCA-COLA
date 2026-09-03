# ✅ CHECKLIST RÁPIDO - MINUTO A MINUTO

## PRE-GRABACIÓN (Hazlo 30 minutos antes)

- [ ] Terminal 1: `npm start` → espera a ver "escuchando en http://localhost:3000"
- [ ] Abre navegador: http://localhost:3000 → verifica que se vea bien
- [ ] Abre VS Code → estructura clara, sin errores
- [ ] Abre GitHub Actions en otra pestaña
- [ ] Limpia pantalla de distracciones
- [ ] Prueba micrófono
- [ ] Abre OBS o herramienta de grabación
- [ ] Selecciona resolución 1920x1080, 30fps
- [ ] Ensaya el guion 2 veces (sin grabar)

---

## DURANTE LA GRABACIÓN

### [0:00-0:15] INTRODUCCIÓN
- [ ] Mira a cámara
- [ ] Di: "Buenas, soy [NOMBRE], presento Coca-Cola Stock Portal"
- [ ] Suena confiado, no lee

**Transición:** "Les muestro la interfaz en acción"

---

### [0:15-0:50] DEMOSTRACIÓN UI (35 segundos)
**Enfoque: Pantalla del navegador**

```
0:15 - Pantalla principal visible
0:20 - Click en "Dar entrada" (Coca-Cola Original)
       Escribe: 20
       Resultado: 150 → 170
       
0:30 - Click en "Despachar" (Sprite)
       Escribe: 5
       Resultado: 45 → 40
       
0:40 - Click "Refrescar stock"
       Los datos persisten
       
0:50 - Transición: "Eso es lo básico. Veamos la automatización"
```

**Qué mencionar:**
- "Interfaz funcional y en tiempo real"
- "Los datos se persisten automáticamente"

---

### [0:50-1:40] GITHUB ACTIONS (50 segundos)
**Enfoque: Navegador - GitHub Actions**

```
0:50 - Navega a GitHub Actions
       Muestra lista de workflows
       
1:00 - Abre el workflow más reciente (el ✅ verde)
       
1:10 - Scrollea mostrando:
       ✅ Install dependencies - PASSED
       ✅ Run tests with coverage - PASSED  
       ✅ Upload artifact - PASSED
       ✅ SonarCloud scan - PASSED
       
1:30 - Menciona: "22 tests passed en cada push automáticamente"

1:40 - Transición: "Veamos los tests en detalle"
```

**Qué mencionar:**
- "Cada push dispara automáticamente esta cadena"
- "Sin intervención manual - puro CI/CD"
- "Valida código, cobertura y seguridad"

---

### [1:40-2:25] TESTING AUTOMATIZADO (45 segundos)
**Enfoque: Terminal - npm test**

```
1:40 - Abre Terminal (Terminal 2)
       
1:45 - Ejecuta: npm test
       Espera salida completa
       
2:00 - Muestra resultado:
       ✅ PASS tests/app.test.js
       ✅ PASS tests/database.test.js
       ✅ PASS tests/error.test.js
       Test Suites: 3 passed, 3 total
       Tests: 22 passed, 22 total
       
2:15 - Ejecuta: npm test -- --coverage
       Muestra tabla de cobertura
       
2:25 - Transición: "Ahora lo importante - qué hace diferente este proyecto"
```

**Qué mencionar:**
- "22 pruebas validando cada funcionalidad"
- "Cobertura de 70% - es profesional"
- "Si algo falla, el código no sube a GitHub"

---

### [2:25-2:55] PUNTOS CLAVE DIFERENCIALES (30 segundos)
**Enfoque: VS Code**

```
2:25 - Abre archivo: .githooks/pre-push
       Muestra que ejecuta tests ANTES de push
       
2:35 - Abre archivo: src/db/database.js
       "Adapté la solución: SQLite → JSON"
       "Problema resuelto sin comprometer calidad"
       
2:45 - Vuelve a GitHub Actions
       Muestra: "Quality Gate: PASSED"
       
2:55 - Transición a cierre
```

**Qué mencionar:**
1. **Git Hooks**: "Los errores se previenen antes, no después"
2. **JSON vs SQLite**: "Problem-solving - adaptabilidad real"
3. **Quality Gates**: "No solo corremos tests, validamos estándares"

---

### [2:55-3:00] CIERRE (5 segundos)
**Enfoque: Mira a cámara**

Di con confianza:
"Este proyecto demuestra **automatización profesional**: CI/CD completo, testing exhaustivo, y calidad garantizada en cada cambio. No es solo una aplicación, es un pipeline DevOps integrado. Gracias."

**Sonrié, cierra con naturalidad**

---

## CHECKLIST DE CALIDAD

### Audio ✅
- [ ] Se entiende claro
- [ ] No hay ruido de fondo (apaga notificaciones)
- [ ] Volumen consistente (no subes y bajas)

### Video ✅
- [ ] Está enfocado
- [ ] Cursor visible (para señalar)
- [ ] Transiciones suaves (no cambios bruscos)

### Contenido ✅
- [ ] Menciona 3 requisitos (UI, CI/CD, Testing)
- [ ] Muestra 3 diferenciales (Hooks, JSON, QualityGates)
- [ ] Timing: máximo 3 minutos
- [ ] No hay errores mostrados
- [ ] Habla confiada

---

## SOLUCIONES RÁPIDAS (Si algo falla durante la grabación)

| Problema | Solución | Tiempo |
|----------|----------|--------|
| UI no responde | Recarga F5 | 10s |
| npm test lento | Salta a cobertura pre-guardada | 20s |
| GitHub Actions no carga | Abre en pestaña nueva | 15s |
| Terminal muestra error | Salta al siguiente comando | Corta en edición |

---

## DESPUÉS DE GRABAR

- [ ] Revisa el video completo (busca:rruidos, claridad)
- [ ] Corta cualquier pausa innecesaria
- [ ] Añade subtítulos si es posible (mejora claridad)
- [ ] Sube a: [Donde lo pida el profesor]
- [ ] Verifica que pese menos de 100MB
- [ ] Haz backup

---

## FRASES CLAVE A MEMORIZAR

```
"Esto es automatización REAL"
"Sin intervención manual"
"Calidad garantizada en cada cambio"
"Adapté la solución cuando enfrenté problemas"
"No es solo una aplicación, es un pipeline DevOps"
```

---

**¡TIEMPO DE GRABACIÓN!** 🎬

Recuerda: Habla lentamente, haz pausas después de puntos importantes, y mira a cámara en intro/cierre. ¡Tú puedes! 💪
