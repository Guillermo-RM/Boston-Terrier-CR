# Boston Terrier CR

Aplicación monolítica con Next.js 16, React 19, MongoDB/Mongoose y Cloudinary. Incluye web pública y panel privado para un único administrador.

## Arquitectura

- `/admin`: inicio de sesión con usuario y contraseña.
- `/admin/panel`: panel protegido antes del renderizado.
- `/api/auth/*`: sesión JWT de ocho horas en cookie HttpOnly.
- `/api/admin/*`: operaciones privadas para cachorros, leads e imágenes.
- `/api/public/*`: lecturas públicas y recepción de contactos.
- MongoDB conserva los datos; Cloudinary conserva las imágenes.

Los cachorros usan un solo modelo con los estados `available` y `sold`. La web y el panel están disponibles únicamente en español.

## Configuración local

1. Crea `.env.local` y define `MONGODB_URI` y `MONGODB_DATABASE` para MongoDB Atlas.
2. Define `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET`.
3. Define `ADMIN_USER`, escribe una contraseña de al menos 12 caracteres en `ADMIN_PASSWORD_HASH` y ejecuta `npm run admin:setup`; el comando la sustituye por su hash bcrypt y genera `JWT_SECRET` si falta.
4. Ejecuta `npm run db:setup` para crear los índices.
5. Inicia el proyecto con `npm run dev`.

## Comandos

- `npm run dev`: servidor de desarrollo.
- `npm run build`: compilación de producción.
- `npm run lint`: revisión de código.
- `npm run typecheck`: comprobación de TypeScript.
- `npm run db:setup`: crea los índices de MongoDB.
- `npm run db:seed:test-dogs`: crea los tres cachorros de prueba si no existen.
- `npm run admin:hash -- "contraseña"`: genera el hash bcrypt del administrador.
- `npm run admin:setup`: protege la contraseña configurada y completa el secreto de sesión.

Los secretos deben permanecer únicamente en `.env.local` o en las variables de entorno de Vercel.
