# 📹 GUION DE PRESENTACIÓN - VIDEO COCA-COLA STOCK PORTAL
## Duración: 3 minutos máximo

---

## 🎯 ESTRUCTURA DEL VIDEO (TIEMPOS)

### INTRO (0:00 - 0:15) - 15 segundos
**Texto a decir:**
"Buenas, mi nombre es [TU NOMBRE], les presento el **Coca-Cola Stock Portal**, un aplicativo de gestión de inventarios implementado siguiendo prácticas DevOps. Este proyecto cumple con los requisitos especificados en el taller 02 y demuestra automatización completa de CI/CD."

**Lo que muestras:**
- Pantalla de inicio del proyecto (localhost:3000)
- Logo de Coca-Cola / UI limpia

---

### REQUISITO #1: INTERFAZ DE USUARIO FUNCIONAL (0:15 - 0:50) - 35 segundos
**Texto a decir:**
"Este es el primer requisito: una **interfaz web completamente funcional**. Pueden ver la pantalla principal con tres productos Coca-Cola disponibles en tiempo real. La interfaz permite agregar productos, modificar stock y despachar pedidos. Todos los cambios se persisten inmediatamente en la base de datos."

**Lo que muestras:**
1. Pantalla principal con productos
2. Hacer clic en "Dar entrada" → agregar cantidad
3. Ver cómo sube el stock
4. Hacer clic en "Despachar" → reducir stock
5. Refrescar la página → datos persisten

**Punto clave a enfatizar:** "Los datos se guardan automáticamente - eso es crítico para un portal de inventario real"

---

### REQUISITO #2: PIPELINE CI/CD AUTOMATIZADO (0:50 - 1:40) - 50 segundos
**Texto a decir:**
"El segundo requisito es un **pipeline CI/CD completamente automatizado**. Aquí en GitHub Actions, cada vez que hago un push, se disparan automáticamente 3 acciones: primero se ejecutan pruebas unitarias con Jest, segundo se genera un reporte de cobertura de código, y tercero se ejecuta análisis de calidad con SonarCloud."

**Lo que muestras:**
1. Abrir GitHub (https://github.com/Jsantos2808/COCA-COLA)
2. Ir a Actions
3. Mostrar workflows ejecutados (los que aparecen en verde ✅)
4. Hacer clic en un workflow exitoso → mostrar:
   - Paso de tests: "22 tests passed"
   - Reporte de cobertura
   - Análisis SonarCloud

**Punto clave a enfatizar:** "Esto es automatización REAL - ningún desarrollador necesita ejecutar pruebas manualmente. El sistema valida calidad en cada cambio."

---

### REQUISITO #3: TESTING AUTOMATIZADO Y COBERTURA (1:40 - 2:25) - 45 segundos
**Texto a decir:**
"El tercer requisito es **testing automatizado con cobertura de código**. Tenemos 22 pruebas que validan funcionalidad de API, base de datos y manejo de errores. Pueden ver la cobertura: 70% de statements, 77% de branches. Cada módulo es probado antes de llegar a producción."

**Lo que muestras:**
1. Terminal en VS Code
2. Ejecutar: `npm test`
3. Mostrar output: "Test Suites: 3 passed, 3 total" y "Tests: 22 passed"
4. Mostrar reporte de cobertura en el workflow
5. Señalar archivos críticos con 100% cobertura

**Punto clave a enfatizar:** "La calidad se garantiza automáticamente - cada feature tiene pruebas antes de ser aceptada"

---

## 🌟 PUNTOS CLAVE ADICIONALES (2:25 - 2:55) - 30 segundos
### Estos son aspectos CRÍTICOS más allá de los requisitos:

**Texto a decir:**
"Pero hay tres aspectos que hacen este proyecto especial desde perspectiva DevOps:

1. **Git Hooks Pre-Push** - Ejecutamos pruebas ANTES de permitir un push. Si algo falla, no sube a GitHub.

2. **Persistencia Inteligente** - Reemplacé SQLite con JSON para evitar problemas de compilación. Esto demuestra **adaptabilidad y problem-solving**.

3. **Quality Gates en SonarCloud** - No solo corremos tests, validamos que la cobertura sea suficiente. Si cae, el deploy se rechaza automáticamente."

**Lo que muestras:**
1. Mostrar archivo `.githooks/pre-push`
2. Mostrar `src/db/database.js` - comentar la refactorización
3. Volver a SonarCloud → mostrar Quality Gate passing

---

## 📊 CIERRE (2:55 - 3:00) - 5 segundos
**Texto a decir:**
"Este proyecto demuestra no solo cumplir requisitos, sino implementar **prácticas profesionales de DevOps**: automatización total, garantía de calidad, y arquitectura escalable. Gracias."

**Lo que muestras:**
- Pantalla principal del proyecto
- O: GitHub con commits exitosos

---

## ✅ CHECKLIST ANTES DE GRABAR

- [ ] Node.js corriendo (npm start en terminal)
- [ ] Interfaz accesible en http://localhost:3000
- [ ] GitHub Actions abierto con workflows visibles
- [ ] VS Code preparado mostrando la estructura
- [ ] OBS o herramienta de grabación configurada
- [ ] Micrófono probado
- [ ] Conexión a internet estable

---

## 📝 NOTAS IMPORTANTES

### Qué NO hagas:
- ❌ Leer de un papel - suena artificial
- ❌ Hablar muy rápido - la gente necesita seguir
- ❌ Mostrar demasiado código - enfocate en resultados
- ❌ Olvidar mencionar la refactorización (SQLite → JSON)

### Qué SÍ hagas:
- ✅ Practica el discurso 2-3 veces antes de grabar
- ✅ Habla con confianza - conoces el proyecto
- ✅ Pausa después de puntos importantes
- ✅ Mira a la cámara en el intro y cierre
- ✅ Usa cursor para señalar elementos en pantalla

---

## 🎬 REQUISITOS TÉCNICOS DE GRABACIÓN

**Recomendado:**
- **Herramienta:** OBS Studio (gratis) o ScreenFlow
- **Resolución:** 1920x1080 (Full HD)
- **Framerate:** 30 fps
- **Audio:** Micrófono de buena calidad
- **Editor:** Cortá los errores, mantén naturalidad
- **Subtítulos:** Opcional pero recomendado para claridad

---

## 💡 DIFERENCIADORES CLAVE

Lo que te hace diferente de otros proyectos:

1. **Refactorización inteligente** - No solo hiciste lo básico, adaptaste la solución cuando enfrentaste problemas (SQLite → JSON)

2. **DevOps integral** - No es solo un servidor, es:
   - Control de versión (Git)
   - Automatización (GitHub Actions)
   - Calidad garantizada (SonarCloud + Jest)
   - Prevención (Git Hooks)

3. **Documentación clara** - Tienes README, arquitectura, y requisitos bien documentados

4. **Profesionalismo** - Commits descriptivos, estructura clara, best practices

---

## 📋 GUION RÁPIDO (Si lo necesitas durante la grabación)

```
[0:00] Intro + "Bienvenida"
[0:15] Demo UI → agregar/despachar stock
[0:50] GitHub Actions → mostrar workflow exitoso  
[1:40] npm test → mostrar 22 tests passed
[2:25] Mencionar: Git Hooks, JSON persistence, Quality Gates
[2:55] Cierre + conclusión
```

---

**¡ÉXITO EN TU PRESENTACIÓN!** 🚀
