import { ChangeEvent, SetStateAction, Dispatch } from "react";
import { Params } from "../utils/types";
import "./Filter.css";

const Filter: React.FC<{
  params: Params;
  setParams: Dispatch<SetStateAction<Params>>;
}> = ({ setParams, params }) => {
  const handleInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value === "") {
      setParams((prev) => {
        const { name, ...rest } = prev;
        return rest;
      });
    } else {
      setParams((prev) => ({ ...prev, name: value }));
    }
  };

  const handleSelect = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement>) => {
    if (name === "status-select") {
      if (value === "") {
        setParams((prev) => {
          const { status, ...rest } = prev;
          return rest;
        });
      } else {
        setParams((prev) => ({ ...prev, status: value }));
      }
    } else {
      if (value === "") {
        setParams((prev) => {
          const { species, ...rest } = prev;
          return rest;
        });
      } else {
        setParams((prev) => ({ ...prev, species: value }));
      }
    }
  };

  return (
    <div className="filter">
      <h3>FILTER BY</h3>
      <label>
        Name:
        <input
          onChange={handleInput}
          value={params.name}
          name="name"
          type="text"
        />
      </label>
      <label>
        Status:
        <select
          onChange={handleSelect}
          value={params.status}
          name="status-select"
        >
          <option value="">--Please select one--</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
      <label>
        Species:
        <select
          onChange={handleSelect}
          value={params.species}
          name="species-select"
        >
          <option value="">--Please select one--</option>
          <option value="Human">Human</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Alien">Alien</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
