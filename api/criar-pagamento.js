export default async function handler(req, res) {

  if(req.method !== 'POST'){
    return res.status(405).json({
      erro:'Método não permitido'
    });
  }

  try{

    const body = req.body;

    const response =
    await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method:'POST',
        headers:{
          'Content-Type':
          'application/json',

          Authorization:
          'Bearer SEU_ACCESS_TOKEN'
        },

        body:JSON.stringify({

          items:
          body.itens.map(item=>({
            title:
            `${item.nome} - Tam ${item.tamanho}`,

            quantity:
            item.quantidade || 1,

            currency_id:
            'BRL',

            unit_price:
            Number(item.valor)
          })),

          payer:{
            email:
            body.email
          },

          back_urls:{
            success:
            'https://SEUSITE.vercel.app/sucesso',

            failure:
            'https://SEUSITE.vercel.app/erro'
          },

          auto_return:
          'approved'
        })
      }
    );

    const data =
    await response.json();

    return res.status(200)
    .json(data);

  }catch(e){

    console.log(e);

    return res.status(500)
    .json({
      erro:e.message
    });

  }

}
