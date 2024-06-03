import Card from "../Card/Card";
import { Character } from "../utils/types";
import "./List.css";
const List: React.FC<{ chars: Character[] }> = ({ chars }) => {
  return (
    <div className="list">
      {chars.length > 0 ? (
        chars.map((char) => <Card key={char.id} char={char} />)
      ) : (
        <p>No matches were found</p>
      )}
    </div>
  );
};

export default List;
