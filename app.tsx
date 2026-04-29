import React, { useEffect, useState } from “react”;
import Spread from “./components/Spread”;
import { CardVM } from “./components/Card”;

type DeckConfig = {
name: string;
cardBack: string;
cards: CardVM[];
};

export default function App() {
const [config, setConfig] = useState<DeckConfig | null>(null);

useEffect(() => {
fetch(”/cards.json”)
.then((r) => r.json())
.then((data: DeckConfig) => setConfig(data));
}, []);

if (!config) {
return (
<div
style={{
height: “100vh”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
color: “#555”,
letterSpacing: “0.2em”,
fontSize: “0.85rem”,
}}
>
loading…
</div>
);
}

return (
<div style={{ height: “100vh”, background: “#0e0e12” }}>
<Spread cards={config.cards} cardBack={config.cardBack} />
</div>
);
}
