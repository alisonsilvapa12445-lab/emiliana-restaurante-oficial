# Emiliana Restaurante Oficial

Capa de publicación de la web oficial de Emiliana Restaurant. Conserva la web pública existente e integra el Centro de Solicitudes bajo el mismo dominio.

## Arquitectura

- `area.js`: centraliza las solicitudes de Publicidad y Reservas, Administración y Contabilidad.
- `reservation.js`: conecta el formulario de reservas con la API del Centro de Solicitudes.
- `api/seo-proxy.js`: conserva títulos, canonical, Open Graph, Schema.org, `robots.txt` y `sitemap.xml` con rutas permitidas y tiempo de espera limitado.
- `vercel.json`: conserva la web pública publicada, sirve los scripts locales y enruta el portal, seguimiento, panel y API al backend operativo.
- `.github/workflows/verify.yml`: ejecuta las comprobaciones automáticas en cada cambio de `main` y en cada pull request.
- La carta 2026 no forma parte de este repositorio ni de este despliegue.

El navegador nunca muestra el dominio técnico del backend. Las rutas públicas permanecen bajo `www.emilianarestaurantebuffetcusco.com.pe`:

- `/portal-publico`
- `/seguimiento`
- `/panel`
- `/api/*`

## Verificación local

Requiere Node.js 22.

```bash
npm test
```

La comprobación valida sintaxis, rutas críticas, origen de la API, normalización segura del enlace privado y la conservación de la web publicada.

## Publicación segura

1. Crear un despliegue de vista previa.
2. Confirmar portada, páginas de áreas, portal, seguimiento y recursos estáticos.
3. Verificar que `/api/health` responde `ok: true`, usa Supabase, protege el seguimiento y confirma separación de roles con credenciales fuertes y únicas.
4. Probar validación de formulario, CORS y autenticación del panel sin insertar datos de prueba en producción.
5. Publicar únicamente la misma revisión que pasó las comprobaciones.

Si una comprobación falla, no se promueve el despliegue. La reversión se realiza restaurando el despliegue de producción anterior desde Vercel.
