import { motion } from "framer-motion";

const Lyrics = () => {
  const lyrics = [
    "Oh demo gods please hear our plea\nGuide our hands let troubles flee\nIn this room with tech and screens\nMay our code be pure and clean",
    "Grant us strength to face the test\nLet our efforts show our best\nIn this realm of bits and bytes\nIlluminate our darkest nights",
    "As we demo let it shine\nFlawless flow and sleek design\nWith each click and keystroke clear\nKeep the bugs and glitches steer",
    "From the servers to the cloud\nLet our work make us proud\nBless our hearts with calm and cheer\nDemo gods be always near",
    "Every demo is a quest\nTo show the world we are the best\nWith your blessing in the air\nGuide us through with love and care",
    "In this moment let us thrive\nKeep the spark of hope alive\nDemo gods we call your name\nHelp us win this sacred game",
  ];

  return (
    <div className="p-8 space-y-6 text-gray-300 text-lg leading-relaxed">
      {lyrics.map((stanza, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 * (index + 1) }}
        >
          {stanza.split("\n").map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              <br />
            </span>
          ))}
        </motion.p>
      ))}
    </div>
  );
};

export default Lyrics;
