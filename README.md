# Boas-vindas ao repositório do projeto Front-end Online Store!

## O que foi desenvolvido

  Neste projeto foi criado uma versão simplificada, sem persistência no banco de dados, de uma **loja online**, desenvolvendo em grupo suas funcionalidades de acordo com demandas definidas em um quadro _Kanban_, em um cenário próximo ao do mercado de trabalho.
  
  A partir dessas demandas, teremos uma aplicação em que usuários poderão:
  - Buscar produtos por termos e categorias a partir da _API do Mercado Livre_ e filtrá-los;
  - Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
  - Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações e;
  - Simular a finalização da compra dos itens selecionados.

## Habilidades

  Neste projeto entendemos:

  * O que são Métodos Ágeis;
  * O que é Kanban;
  * O que é Scrum;
  * Como trabalhar em equipes utilizando Kanban ou Scrum de maneira eficaz;
  * Como Praticar todas as habilidades desenvolvidas até agora no módulo de Front-end:
    * Fazer requisições e consumir dados vindos de uma `API`;
    * Utilizar os ciclos de vida de um componente React;
    * Utilizar a função `setState` de forma a garantir que um determinado código só é executado após o estado ser atualizado
    * Utilizar o componente `BrowserRouter` corretamente;
    * Criar rotas, mapeando o caminho da URL com o componente correspondente, via `Route`;
    * Utilizar o `Switch` do `React Router`;
    * Criar links de navegação na aplicação com o componente `Link` e `NavLink` (passando props/state);


  ## Grupo

  PO/Scrum Master: Guilherme Pinho
  - Guilherme Pinho
  - Gustavo Dutra
  - Pedro Santana
  - Alexandre Evangelista
  - Daniel Ricardo
  - Euller Hallem

  ## Documentação da API do Mercado Livre

  A página _web_ consome os dados da API do _Mercado Livre_ ([documentação](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas)) para realizar a busca de itens da loja online. Para realizar essas buscas, foi utilizado os seguintes _endpoints_:

  - Para listar as categorias disponíveis: https://api.mercadolibre.com/sites/MLB/categories
  - Para buscar por itens por termo: https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
  - Para buscar itens por categoria: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
  - Para buscar itens de uma categoria por termo (vale ressaltar, que este endpoint não necessariamente precisa receber ambos os parâmetros para funcionar): https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
  - Para buscar itens de manerai sorteada: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY&sort=$SORT_ID
  - Para buscar detalhes de um item especifico: https://api.mercadolibre.com/items/$PRODUCT_ID



---
