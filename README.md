🤖 TutorIA - Proyecto de Tecnologías Emergentes
Bienvenido al repositorio oficial de TutorIA, un agente de inteligencia artificial diseñado para apoyar el aprendizaje de estudiantes de ingeniería en los cursos de Pensamiento Computacional y Programación Avanzada.

Este proyecto utiliza una arquitectura de Monorepo que contiene tanto el servidor (Backend en Flask) como la interfaz de usuario (Frontend en React).

📋 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado en tu computadora:

Git (Para usuarios de Windows, se recomienda usar Git Bash como terminal principal).

Python 3.10 o superior.

Node.js 18 o superior (Incluye npm).

Una API Key válida de OpenAI (Solicitar al líder del equipo si se va a realizar una prueba).

🚀 Guía de Instalación Paso a Paso
Paso 1: Clonar el repositorio
Al clonar el proyecto, por defecto estarás en la rama main (que está vacía). Todo el desarrollo se encuentra en la rama develop.

Abre tu terminal y ejecuta:

Bash
# 1. Clona el repositorio (REEMPLAZAR CON LA URL REAL DEL PROYECTO)
git clone https://github.com/tu-usuario/tu-repositorio.git

# 2. Entra a la carpeta del proyecto
cd tu-repositorio

# 3. Pásate a la rama de integración donde está el código
git checkout develop
Paso 2: Levantar el Backend (Servidor Flask e IA)
El backend utiliza un entorno virtual para aislar las librerías de Python.

Abre una terminal en la raíz del proyecto y sigue estos pasos:

Bash
# 1. Entra a la carpeta del backend
cd backend

# 2. Crea el entorno virtual (Solo se hace la primera vez)
# En Windows:
python -m venv venv
# En Mac/Linux:
python3 -m venv venv
3. Activa el entorno virtual (Depende de tu Sistema Operativo):

🍎 Para usuarios de macOS / Linux:

Bash
source venv/bin/activate
🪟 Para usuarios de Windows (usando Git Bash):

Bash
source venv/Scripts/activate
(Sabrás que funcionó porque verás (venv) al inicio de tu línea de comandos).

4. Instala las dependencias y configura la seguridad:

Bash
# Instala la receta exacta de librerías
pip install -r requirements.txt
⚠️ IMPORTANTE (Seguridad): Nunca subiremos las llaves de la API a GitHub. Debes crear un archivo llamado exactamente .env dentro de la carpeta backend y pegar lo siguiente (pide la llave real al equipo):

Fragmento de código
OPENAI_API_KEY=sk-tu-llave-real-aqui
FINE_TUNED_MODEL_ID=gpt-4o-mini
5. Arranca el servidor:

Bash
# En Windows:
python app.py
# En Mac/Linux:
python3 app.py
El servidor estará corriendo en http://127.0.0.1:5000.

Paso 3: Levantar el Frontend (Interfaz React)
Con el backend corriendo, abre una nueva pestaña en tu terminal (para no apagar Flask) y sitúate en la raíz del proyecto.

Bash
# 1. Entra a la carpeta del frontend
cd frontend

# 2. Descarga todas las librerías de Node (Solo se hace la primera vez)
npm install

# 3. Enciende el entorno de desarrollo
npm run dev
La interfaz estará disponible en http://localhost:5173.

🌿 Flujo de Trabajo (GitFlow)
Para evitar conflictos en el código, NUNCA trabajes directamente en la rama develop ni en main.

Cuando vayas a crear una nueva funcionalidad, crea tu propia rama desde develop:

Bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-tu-tarea
Al terminar tu tarea, haz tus commits, súbelos a GitHub (git push origin feature/nombre-de-tu-tarea) y crea un Pull Request hacia la rama develop.
