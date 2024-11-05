import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Root(props) {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [impostors, setImpostors] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const storedPlayers = localStorage.getItem("jogo_do_impostor_players");
      const storedImpostors = localStorage.getItem(
        "jogo_do_impostor_impostors"
      );

      if (storedPlayers) {
        setPlayers(storedPlayers.split(","));
      }

      if (storedImpostors) {
        setImpostors(Number(storedImpostors));
      }

      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleAddPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer("");
    }
  };

  const deletePlayer = (indexToDelete) => {
    setPlayers(players.filter((_, index) => index !== indexToDelete));
  };

  const startGame = () => {
    localStorage.setItem("jogo_do_impostor_players", String(players));
    localStorage.setItem("jogo_do_impostor_impostors", String(impostors));

    window.location.href = "/game";
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5">Jogo do Desenhista Impostor</Typography>
        <br></br>
        <Typography variant="h6">Configurar Jogo</Typography>
        <br></br>
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <TextField
            label="Nome do Jogador"
            variant="outlined"
            onChange={(e) => setNewPlayer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
          />
          <Button variant="outlined" onClick={handleAddPlayer}>
            Adicionar
          </Button>
        </Box>
        <TextField
          label="Número de Impostores"
          variant="outlined"
          type="number"
          value={impostors}
          onChange={(e) => setImpostors(Number(e.target.value))}
        />
        <List>
          {players.map((player, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" onClick={() => deletePlayer(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={player} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          disabled={players.length < impostors + 2}
          onClick={startGame}
        >
          Iniciar Jogo
        </Button>
      </Paper>

      <br></br>

      <Paper elevation={3} sx={{ p: 2 }}>
        <p>O Desenhista Impostor é um jogo onde jogadores trabalham juntos para criar um desenho baseado em uma palavra secreta, enquanto um impostor tenta se passar por um jogador regular sem conhecer a palavra.</p>

        <Typography variant="h6">Preparação do jogo:</Typography>
        <ul>
          <li>Mínimo de 3 jogadores.</li>
          <li>
            Cadastre os nomes dos jogadores no app
          </li>
          <li>
            O sistema irá:
            <ul>
              <li>
                Sortear aleatoriamente um impostor
              </li>
              <li>
                Distribuir uma palavra secreta para os demais jogadores
              </li>
            </ul>
          </li>
        </ul>

        <Typography variant="h6">Regras:</Typography>
        <ol>
          <li>
            <h3>Fase de Desenho</h3>
            <ul>
              <li>
                Cada jogador faz um traço no desenho no seu turno, sem falar ou
                fazer gestos.
              </li>
              <li>
                O impostor deve fingir que conhece a palavra e disfarçar seu
                traço para não ser descoberto.
              </li>
            </ul>
          </li>
          <li>
            <h3>Fase de Votação</h3>
            <ul>
              <li>
                Ao final de uma (ou mais) rodada(s), todos votam em quem acham ser o impostor
              </li>
              <li>
                Quem receber mais votos é eliminado
              </li>
            </ul>
          </li>
          <li>
            <h3>Condições de Vitória</h3>
            <ul>
              <li>
                <b>Jogadores Regulares vencem se:</b> Identificarem corretamente o impostor
              </li>
              <li>
                <b>Impostor vence se:</b> Adivinhar a palavra correta
              </li>
            </ul>
          </li>
        </ol>
      </Paper>
    </Container>
  );
}
