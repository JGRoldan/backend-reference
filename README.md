## 📌 Backend Reference Resumen

Este repositorio sirve como **guía práctica y de consulta rápida** para desarrolladores backend.  
Incluye ejemplos bien estructurados de cómo construir piezas de software.

Cada aplicación dentro del monorepo:
- Se ejecuta de forma **independiente** con su propio `docker-compose` y base de datos.
- Implementa **arquitectura hexagonal/clean**, separando dominio, aplicación e infraestructura.
- Contiene casos de uso completos (ejemplo: `auth` con login, registro, refresh token, forgot/reset password).
- Usa `packages/shared` únicamente para **helpers genéricos** (sin lógica de negocio compartida).

👉 El objetivo es que cualquier persona pueda **explorar, aprender y reutilizar patrones** de backend moderno de manera rápida y confiable.