from flask import Blueprint, request, jsonify
from services.ia_service import generar_respuesta_tutor

ia_bp = Blueprint('ia_bp', __name__)

@ia_bp.route('/chat', methods=['POST'])
def chat_con_ia():
    datos = request.get_json()
    
    # Ahora sacamos la lista completa de mensajes
    historial = datos.get('historial')

    if not historial or len(historial) == 0:
        return jsonify({"error": "No se recibió el historial de mensajes"}), 400

    # Le pasamos la lista completa a nuestro servicio
    respuesta_ia = generar_respuesta_tutor(historial)
    
    return jsonify({"respuesta": respuesta_ia}), 200