import React from 'react';
import { motion } from 'motion/react';
import { CITY_TERMINALS } from '../data';
import { Shipment, CityTerminal } from '../types';

interface RoutePlannerProps {
  activeShipment?: Shipment | null;
  customOrigin?: string;
  customDestination?: string;
}

export default function RoutePlanner({ activeShipment, customOrigin, customDestination }: RoutePlannerProps) {
  // Determine start/end cities based on either activeShipment or custom props
  const startCityName = activeShipment ? activeShipment.origin : customOrigin;
  const endCityName = activeShipment ? activeShipment.destination : customDestination;

  const startCity = CITY_TERMINALS.find(c => c.name === startCityName);
  const endCity = CITY_TERMINALS.find(c => c.name === endCityName);

  // Default routes to draw background connections between some key terminals to look like an interconnected network
  const backgroundConnections = [
    ['Москва', 'Санкт-Петербург'],
    ['Москва', 'Минск'],
    ['Москва', 'Краснодар'],
    ['Москва', 'Екатеринбург'],
    ['Екатеринбург', 'Новосибирск'],
    ['Новосибирск', 'Алматы'],
    ['Новосибирск', 'Владивосток'],
    ['Калининград', 'Санкт-Петербург'],
  ];

  const getTerminalCoords = (name: string) => {
    const term = CITY_TERMINALS.find(t => t.name === name);
    return term ? term.coordinates : null;
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] p-4 select-none flex flex-col justify-between" id="route-planner-canvas">
      {/* Dynamic Header */}
      <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur border border-white/10 rounded-none px-2.5 py-1 text-[10px] font-mono text-[#888]">
        <span className="text-gold font-bold">LIVE</span> СЕТЬ ТЕРМИНАЛОВ «ВЕКТОР»
      </div>

      {/* Main Map Canvas */}
      <div className="flex-1 w-full relative min-h-[250px] mt-6">
        <svg className="w-full h-full min-h-[250px]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines background */}
          <defs>
            <pattern id="map-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="rgba(212, 175, 55, 0.05)" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#map-grid)" />

          {/* Draw all background network lines */}
          {backgroundConnections.map(([from, to], idx) => {
            const p1 = getTerminalCoords(from);
            const p2 = getTerminalCoords(to);
            if (!p1 || !p2) return null;

            // Check if this is the active shipment route to avoid drawing double active paths as background lines
            const isCurrentlyActive = 
              (startCityName === from && endCityName === to) || 
              (startCityName === to && endCityName === from);

            if (isCurrentlyActive) return null;

            return (
              <line
                key={`bg-link-${idx}`}
                x1={`${p1.x}%`}
                y1={`${p1.y}%`}
                x2={`${p2.x}%`}
                y2={`${p2.y}%`}
                stroke="rgba(212, 175, 55, 0.08)"
                strokeWidth="0.4"
                strokeDasharray="2,2"
              />
            );
          })}

          {/* Highlight active route path */}
          {startCity && endCity && (
            <>
              {/* Pulsing glow background path */}
              <motion.line
                x1={`${startCity.coordinates.x}%`}
                y1={`${startCity.coordinates.y}%`}
                x2={`${endCity.coordinates.x}%`}
                y2={`${endCity.coordinates.y}%`}
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Sharp active connection line */}
              <line
                x1={`${startCity.coordinates.x}%`}
                y1={`${startCity.coordinates.y}%`}
                x2={`${endCity.coordinates.x}%`}
                y2={`${endCity.coordinates.y}%`}
                stroke="#d4af37"
                strokeWidth="1.2"
                strokeLinecap="round"
                className="stroke-dash-active"
                style={{
                  strokeDasharray: '4,4',
                }}
              />

              {/* Animated shipping container cursor moving along path */}
              <circle cx="0" cy="0" r="1.8" fill="#d4af37">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={`M ${startCity.coordinates.x} ${startCity.coordinates.y} L ${endCity.coordinates.x} ${endCity.coordinates.y}`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                />
              </circle>
              
              {/* Outer pulsing ring centered on moving cursor */}
              <circle cx="0" cy="0" r="4" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.7">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={`M ${startCity.coordinates.x} ${startCity.coordinates.y} L ${endCity.coordinates.x} ${endCity.coordinates.y}`}
                />
              </circle>
            </>
          )}

          {/* Draw Terminal Dots and Labels */}
          {CITY_TERMINALS.map((terminal) => {
            const isStart = startCityName === terminal.name;
            const isEnd = endCityName === terminal.name;
            const isKeyNode = isStart || isEnd;

            return (
              <g key={terminal.name} id={`map-node-${terminal.name}`}>
                {/* Outer Glow Ring for active hubs */}
                {isKeyNode && (
                  <circle
                    cx={`${terminal.coordinates.x}%`}
                    cy={`${terminal.coordinates.y}%`}
                    r="2.5%"
                    fill="none"
                    stroke={isStart ? '#d4af37' : '#ffffff'}
                    strokeWidth="0.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${terminal.coordinates.x}% ${terminal.coordinates.y}%`, animationDuration: '2s' }}
                  />
                )}

                {/* Main Dot */}
                <circle
                  cx={`${terminal.coordinates.x}%`}
                  cy={`${terminal.coordinates.y}%`}
                  r={isKeyNode ? "1.5%" : "0.9%"}
                  fill={isStart ? '#d4af37' : isEnd ? '#ffffff' : '#1a1a1a'}
                  stroke={isKeyNode ? '#fff' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isKeyNode ? '1' : '0.5'}
                  className="transition-all duration-300"
                />

                {/* Text Label with smart offset depending on coordinate location */}
                <text
                  x={`${terminal.coordinates.x}%`}
                  y={`${terminal.coordinates.y - 3}%`}
                  fill={isKeyNode ? '#fff' : '#444'}
                  fontSize="2.4"
                  fontWeight={isKeyNode ? 'bold' : 'normal'}
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  {terminal.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend / Status indicator bar inside map */}
      <div className="bg-black/50 border border-white/10 rounded-none p-3 flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center space-x-4 text-[10px] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            <span className="text-[#888]">Пункт отправки</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ffffff]" />
            <span className="text-[#888]">Пункт назначения</span>
          </div>
        </div>

        {startCity && endCity && (
          <div className="text-[10px] font-mono text-gold font-bold truncate uppercase tracking-wider">
            Маршрут: {startCity.name} &rarr; {endCity.name}
          </div>
        )}
      </div>
    </div>
  );
}
