from flask import Flask

app = Flask(__name__)

@app.route('/')
def hola_mundo():
    return {"mensaje": "Prueba de servidor Flask"}

if __name__ == '__main__':
    app.run(debug=True)