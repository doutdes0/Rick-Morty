import { Character } from "../utils/types";
import "./Card.css";

const Card: React.FC<{ char: Character }> = ({ char }) => {
  return (
    <div className="card">
      <img height="200px" width="200px" src={char.image} alt={char.name} />
      <div className="description">
        <h3>{char.name}</h3>
        <p>Status: {char.status}</p>
        <p>Species: {char.species}</p>
      </div>
    </div>
  );
};

export default Card;
