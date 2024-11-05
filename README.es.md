# Flujo de trabajo con Git Flow

Este proyecto sigue el modelo de Git Flow para el control de versiones. A continuación, se detalla cómo trabajar con este flujo y cómo están protegidas las ramas principales.

## Ramas principales

- `main`: Representa el código en producción. Solo se actualiza mediante releases o hotfixes.
- `develop`: Rama de desarrollo principal. Todas las features se integran aquí.

## Flujos de trabajo

### Desarrollo de nuevas características (features)

1. Crear una nueva rama desde `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nombre-de-la-caracteristica
   ```

2. Desarrollar la nueva característica en esta rama.

3. Una vez completada, crear un Pull Request a `develop`:
   ```bash
   git push origin feature/nombre-de-la-caracteristica
   ```
   Luego, crear el PR en GitHub.

4. Después de la revisión y aprobación, hacer merge del PR en `develop`.

### Preparar una release

1. Crear una rama de release desde `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.x.x
   ```

2. Realizar ajustes finales, actualizar versión y documentación.

3. Crear un Pull Request a `main`:
   ```bash
   git push origin release/v1.x.x
   ```
   Crear el PR en GitHub.

4. Después de la aprobación, hacer merge en `main` y etiquetar la nueva versión:
   ```bash
   git checkout main
   git pull origin main
   git merge release/v1.x.x
   git tag -a v1.x.x -m "Release v1.x.x"
   git push origin main --tags
   ```

5. Hacer merge de la release también en `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git merge release/v1.x.x
   git push origin develop
   ```

6. Eliminar la rama de release:
   ```bash
   git branch -d release/v1.x.x
   git push origin --delete release/v1.x.x
   ```

### Hotfixes

1. Crear una rama de hotfix desde `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/descripcion-del-problema
   ```

2. Realizar la corrección.

3. Crear un Pull Request a `main`:
   ```bash
   git push origin hotfix/descripcion-del-problema
   ```
   Crear el PR en GitHub.

4. Después de la aprobación, hacer merge en `main` y etiquetar:
   ```bash
   git checkout main
   git pull origin main
   git merge hotfix/descripcion-del-problema
   git tag -a v1.x.y -m "Hotfix v1.x.y"
   git push origin main --tags
   ```

5. Hacer merge del hotfix también en `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git merge hotfix/descripcion-del-problema
   git push origin develop
   ```

6. Eliminar la rama de hotfix:
   ```bash
   git branch -d hotfix/descripcion-del-problema
   git push origin --delete hotfix/descripcion-del-problema
   ```

## Protección de ramas en GitHub

Para proteger las ramas `main` y `develop` en GitHub:

- [x] Require pull request reviews before merging
- [x] Require status checks to pass before merging
- [x] Require branches to be up to date before merging
- [x] Include administrators
- [x] Restrict who can push to matching branches

Estas configuraciones aseguran que:
- No se puedan hacer push directos a `main` o `develop`.
- Se requieran Pull Requests para todos los cambios.
- Los PR necesiten revisión antes de ser mergeados.
- Las ramas deban estar actualizadas antes del merge.
- Estas reglas se apliquen incluso a los administradores.

## Convenciones de commit

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) para nuestros mensajes de commit. Algunos ejemplos:

- `feat: añadir nueva funcionalidad de login`
- `fix: corregir error en la validación de formularios`
- `docs: actualizar README con instrucciones de instalación`
- `style: formatear código según estándares del proyecto`
- `refactor: simplificar lógica de procesamiento de datos`
- `test: añadir pruebas para el módulo de autenticación`
- `chore: actualizar dependencias`

Siguiendo estas convenciones y flujos de trabajo, mantendremos un historial de proyecto limpio y fácil de seguir.