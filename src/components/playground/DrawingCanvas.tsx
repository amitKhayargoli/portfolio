"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Eraser, Undo2 } from "lucide-react";

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  size: number;
}

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState("#f5f5f5");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }
  }, [strokes, currentStroke]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = 300 * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = "300px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPos(e);
    setCurrentStroke({ points: [pos], color: brushColor, size: brushSize });
  };

  const drawMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentStroke) return;
    const pos = getPos(e);
    setCurrentStroke((prev) =>
      prev ? { ...prev, points: [...prev.points, pos] } : null
    );
  };

  const stopDrawing = () => {
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
    setIsDrawing(false);
  };

  const undo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setStrokes([]);
    setCurrentStroke(null);
  };

  return (
    <div className="space-y-4">
      {/* Canvas */}
      <div className="relative w-full h-[300px] rounded-lg bg-background border border-border overflow-hidden">
        <canvas
          ref={canvasRef}
          className="cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={drawMove}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={drawMove}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-xs text-muted w-8">{brushSize}px</span>
        </div>

        {/* Color */}
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer bg-transparent"
        />

        {/* Undo */}
        <button
          onClick={undo}
          disabled={strokes.length === 0}
          className="p-2 text-muted hover:text-foreground disabled:opacity-30 transition-colors"
          aria-label="Undo"
        >
          <Undo2 size={16} />
        </button>

        {/* Clear */}
        <button
          onClick={clear}
          disabled={strokes.length === 0}
          className="p-2 text-muted hover:text-foreground disabled:opacity-30 transition-colors"
          aria-label="Clear canvas"
        >
          <Eraser size={16} />
        </button>
      </div>
    </div>
  );
}
