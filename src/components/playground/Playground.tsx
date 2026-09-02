"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Grid3X3, Sparkles } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { TicTacToe } from "./TicTacToe";
import { DrawingCanvas } from "./DrawingCanvas";

export function Playground() {
  const [activeGame, setActiveGame] = useState<"tictactoe" | "drawing" | null>(null);

  const items = [
    { id: "drawing", label: "Draw", description: "Sketch something", icon: Pencil },
    { id: "tictactoe", label: "Tic Tac Toe", description: "Play a game", icon: Grid3X3 },
    { id: "secret", label: "???", description: "Try the Konami code", icon: Sparkles },
  ];

  return (
    <section id="playground" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <motion.h2
          className="text-xs uppercase tracking-widest text-muted mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Playground
        </motion.h2>

        <motion.p
          className="text-sm text-muted mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Small experiments, unnecessary ideas and things I wanted to build.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              className="group flex items-center gap-4 p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-all text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => {
                if (item.id === "tictactoe") setActiveGame("tictactoe");
                if (item.id === "drawing") setActiveGame("drawing");
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-muted group-hover:text-foreground transition-colors">
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tic Tac Toe Modal */}
      <Modal
        isOpen={activeGame === "tictactoe"}
        onClose={() => setActiveGame(null)}
        title="Tic Tac Toe"
      >
        <TicTacToe />
      </Modal>

      {/* Drawing Canvas Modal */}
      <Modal
        isOpen={activeGame === "drawing"}
        onClose={() => setActiveGame(null)}
        title="Draw Something"
      >
        <DrawingCanvas />
      </Modal>
    </section>
  );
}
