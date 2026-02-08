import azure.functions as func
import json
import logging

app = func.FunctionApp()

@app.route(route="classify_ticket", auth_level=func.AuthLevel.ANONYMOUS)
def classify_ticket(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processando nova triagem de ticket.')

    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse("Invalid JSON", status_code=400)

    description = req_body.get('description', '').lower()
    
    # Lógica de Classificação (Exemplo de Heurística de Suporte)
    priority = "Normal"
    topic = "Suporte Técnico"
    
    keywords_criticos = ['urgente', 'parado', 'erro crítico', 'fora do ar', 'não consigo logar']
    if any(k in description for k in keywords_criticos):
        priority = "Crítico"
        
    if 'pagamento' in description or 'boleto' in description or 'financeiro' in description:
        topic = "Financeiro"
    elif 'acesso' in description or 'senha' in description or 'login' in description:
        topic = "Acesso/Segurança"
    elif 'integração' in description or 'api' in description:
        topic = "Integração/API"

    response = {
        "priority": priority,
        "topic": topic,
        "automated_message": f"Ticket classificado como {priority}. Encaminhando para a fila de {topic}."
    }

    return func.HttpResponse(
        json.dumps(response),
        mimetype="application/json",
        status_code=200
    )

@app.route(route="get_analytics", auth_level=func.AuthLevel.ANONYMOUS)
def get_analytics(req: func.HttpRequest) -> func.HttpResponse:
    # Dados simulados agregados para o dashboard de B.I.
    data = {
        "labels": ["Financeiro", "Portal Educ", "RH", "Integrações API", "Segurança"],
        "counts": [15, 22, 5, 8, 12]
    }
    return func.HttpResponse(json.dumps(data), mimetype="application/json")
