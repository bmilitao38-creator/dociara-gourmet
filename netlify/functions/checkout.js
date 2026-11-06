const https = require('https');

exports.handler = async function(event, context) {
  // Garante que a requisição é do tipo POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const dadosPedido = JSON.parse(event.body);

    // Aqui você insere a lógica de integração com a API de pagamento (ex: Mercado Pago, Stripe, etc.)
    // Usando a chave secreta que está protegida nas Variáveis de Ambiente do Netlify:
    const chaveSecreta = process.env.PAYMENT_SECRET_KEY;

    // Exemplo de resposta de sucesso simulando a criação de um pagamento/Pix
    return {
      statusCode: 200,
      body: JSON.stringify({
        sucesso: true,
        mensagem: "Pedido processado com sucesso!",
        dados: dadosPedido
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};