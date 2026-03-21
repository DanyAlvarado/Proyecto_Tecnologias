import os
from flask import Flask
from dotenv import load_dotenv

# 1. Cargamos las contraseñas del .env ANTES de importar cualquier otra cosa
load_dotenv()

# 2. AHORA SÍ importamos nuestro "recepcionista", porque la llave ya está en la memoria
from routes.ia_routes import ia_bp  

app = Flask(__name__)

# 3. Registramos las rutas
app.register_blueprint(ia_bp, url_prefix='/api/ia')

# 4. Ruta base de prueba
@app.route('/')
def estado_servidor():
    modelo = os.getenv("FINE_TUNED_MODEL_ID", "No definido")
    return {"estado": "Servidor Flask funcionando", "modelo_conectado": modelo}

if __name__ == '__main__':
    app.run(debug=True)