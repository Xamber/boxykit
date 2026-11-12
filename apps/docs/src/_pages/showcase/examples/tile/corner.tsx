import { Tile, Tiles } from "boxykit/react";
import { Cloud, Sun } from "lucide-react";

export function TileCorner() {
  return (
    <Tiles>
      <Tile label="Wed" value="14°" corner="08.10" icon={<Cloud className="boxy-icon" />} />
      <Tile look="accent" label="Thu" value="19°" corner="09.10" icon={<Sun className="boxy-icon" />} />
    </Tiles>
  );
}
