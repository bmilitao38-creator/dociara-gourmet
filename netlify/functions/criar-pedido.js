const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const dados = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('pedidos')
      .insert([
        {
          cliente_nome: dados.cliente,
          cliente_telefone: dados.telefone,
          tipo_recebimento: dados.tipoRecebimento,
          endereco: dados.endereco,
          data_agendamento: dados.data,
          hora_agendamento: dados.hora,
          tamanho_bolo: dados.tamanho,
          massa: dados.massa,
          recheio: dados.recheio,
          cobertura: dados.cobertura,
          observacoes: dados.observacoes,
          valor_total: dados.valorTotal,
          status: 'Pendente'
        }
      ])
      .select();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        sucesso: true, 
        mensagem: 'Pedido gravado com sucesso no Supabase!', 
        pedido: data[0] 
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: err.message })
    };
  }
};