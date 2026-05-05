import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
// importando o axios - biblioteca que permite consumir a api
import axios from "axios";
// importando o hook useState e useEffect (é o efeito colateral do componente, executado assim que o compenente é chamda, o que é chamado primeiro)
import {useState, useEffect} from "react";

const HomeContent = () => {
  // criando um estado para lista de jogo
  const [games, setGames] = useState([]); // o estado inicial é um array vazio

  // criando um estado para controlar o CARREGAMENTO - LOADING
  const [loading, setLoading] = useState(true);

  // hook useEffect - efeito colateral do componente
  useEffect(() => {
    // aqui vai a lógica do useEffect
    // criando uma função para buscar os jogos na api (fetch - pegar)
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");// espera ele trazer os jogos
        //console.log(reponse) // printa a lista no console
        // passando a lista de jogos para o estado
        setGames(response.data.games)
      } catch(error) {
        console.log(error)
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    }
    // invocando a função, precisar ser invocado para funcionar, fica dentro do useEffect
    fetchGames();
  }, []) // dependencia do useEffect

  // função de exclusão
  const deleteGame = async (gameId) => {
    try {
      // recebe o id do jogo e manda como parametro p api excluir o jogo
      // a resposta da api é armazenada na variavel response
      const response = await axios.delete(`http://localhost:4000/games/${gameId}`);
      if (response.status == 204){ // se o status retornado pela api for 204:
        alert("O jogo foi excluido com sucesso")
        // atualizando o estado removendo o jogo excluido
        setGames(games.filter((game) => game._id !== gameId))
      }
    } catch (error){
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          
          {/* se o estado for verdadeiro: */}
          {loading ? (<Loading loading={loading}/> 
          // se o estado for falso:
          ) : (

          <div className={styles.games} id={styles.games}>
            {/* Lista de jogos irá aqui */}
            {/* percorrendo a lista de jogos */}
            {games.map((game) => (
              <ul className={styles.listGames} key={game._id}>
                <div className={styles.gameImg}>
                  <img src="images/game_cd_cover.png" alt="Jogo em estoque"/>
                </div>
                {/* informações do jogo */}
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>Plataforma: {game.descriptions.platform}</li>
                  <li>Gênero: {game.descriptions.genre}</li>
                  <li>Classificação: {game.descriptions.rating}</li>
                  <li>Ano: {game.year}</li>
                  <li>Preço: {game.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL"
                  })}</li>
                  {/* Botão de deletar */}
                  <button className={styles.btnDel} onClick={() => {
                    const confirmacao = window.confirm(
                      "Deseja mesmo excluir o jogo?"
                    );
                    // se o valor for verdadeiro 
                    if (confirmacao) {
                      // invocando a função de deletar
                      deleteGame(game._id)
                    }
                  }}>
                    Deletar
                  </button>
                </div>
              </ul>
            ))}
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeContent;
