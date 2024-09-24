# CLI de Gestión de Usuarios

Este proyecto es una CLI (Command Line Interface) para gestionar usuarios. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) con usuarios almacenados en un archivo JSON.

## Funcionalidades

1. **Agregar un nuevo usuario** (`add`):

   - Agrega un usuario con los siguientes atributos:
     - `name`: Nombre del usuario.
     - `lastName`: Apellido del usuario.
     - `email`: Correo electrónico único.
     - `password`: Contraseña encriptada.

   **Uso**:

   ```bash
   $ node index.js add <name> <lastName> <email> <password>
   ```

   **Ejemplo**:

   ```bash
   $ node index.js add John Doe johndoe@gmail.com 12345password
   ```

2. **Listar todos los usuarios** (`list`):

   - Muestra una lista de todos los usuarios registrados en el archivo JSON.

   **Uso**:

   ```bash
   $ node index.js list
   ```

3. **Buscar un usuario por ID** (`get`):

   - Busca y muestra un usuario específico a través de su `ID`.

   **Uso**:

   ```bash
   $ node index.js get <id>
   ```

   **Ejemplo**:

   ```bash
   $ node index.js get 123e4567-e89b-12d3-a456-426614174000
   ```

4. **Actualizar un usuario** (`update`):

   - Actualiza los datos de un usuario por su `ID`. Si algún campo no se pasa como argumento, permanecerá sin cambios.
   - Los campos que puedes actualizar son: `name`, `lastName`, `email` y `password`.

   **Uso**:

   ```bash
   $ node index.js update <id> <name?> <lastName?> <email?> <password?>
   ```

   **Ejemplo**:

   ```bash
   $ node index.js update 123e4567-e89b-12d3-a456-426614174000 John UpdatedDoe johndoe@gmail.com newpassword
   ```

5. **Eliminar un usuario** (`delete`):

   - Elimina un usuario del sistema a través de su `ID`.

   **Uso**:

   ```bash
   $ node index.js delete <id>
   ```

   **Ejemplo**:

   ```bash
   $ node index.js delete 123e4567-e89b-12d3-a456-426614174000
   ```

6. **Ayuda** (`help`):

   - Lista todas las funcionalidades disponibles para la CLI, mostrando las diferentes acciones que se pueden ejecutar y cómo usarlas.

   **Uso**:

   ```bash
   $ node index.js help
   ```

   **Salida esperada**:

   ```
   Available commands:
     - add <name> <lastName> <email> <password> : Add a new user
     - list : List all users
     - get <id> : Get user by ID
     - update <id> <name?> <lastName?> <email?> <password?> : Update user by ID
     - delete <id> : Delete user by ID
     - help : Show this help message
   ```

## Estructura del Proyecto

- **index.js**: El archivo principal que maneja los comandos y la lógica del CLI.
- **utils/handleError.js**: Módulo que maneja los errores y los guarda en un archivo.
- **data/users.json**: Archivo donde se almacenan los datos de los usuarios.
- **.env**: Archivo que contiene las variables de entorno, como la ruta del archivo de usuarios (`PATH_FILE_USER`) y el archivo de errores (`PATH_FILE_ERROR`).

## Instalación y Configuración

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PATH_FILE_USER=./data/users.json
   PATH_FILE_ERROR=./data/errors.log
   ```

4. Asegúrate de que los directorios y archivos necesarios existan:
   - Crea la carpeta `data/` si no existe.
   - Dentro de `data/`, crea el archivo `users.json` e inicialízalo con un array vacío:
     ```json
     []
     ```
   - Opcionalmente, crea el archivo de errores `errors.log` si deseas registrar errores.

## Ejecución

Puedes ejecutar cualquier comando usando Node.js desde la consola.

```bash
node index.js <comando> <argumentos>
```
