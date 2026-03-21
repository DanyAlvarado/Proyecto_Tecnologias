from flask import Blueprint, request, jsonify
from services.ia_service import generar_respuesta_tutor

# Creamos un "Blueprint" (un fragmento de aplicación Flask para mantener el orden)
ia_bp = Blueprint('ia_bp', __name__)

@ia_bp.route('/chat', methods=['POST'])
def chat_con_ia():
    datos = request.get_json()
    mensaje = datos.get('mensaje')

    if not mensaje:
        return jsonify({"error": "No se recibió ningún mensaje"}), 400

    # Llamamos a nuestro servicio
    respuesta_ia = generar_respuesta_tutor(mensaje)
    
    return jsonify({"respuesta": respuesta_ia}), 200