import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import { FONTS, COLORS } from '../../../constants/theme';

export default function StatsPentagon({ stats }) {
  // 1. Safety Check: Default to 0 if stats are missing to prevent crash
  const safeStats = stats || {
    mind: 0,
    vitality: 0,
    knowledge: 0,
    wealth: 0,
    creativity: 0,
  };

  const data = [
    { label: 'Mind', value: safeStats.mind, color: '#8A2BE2' },
    { label: 'Vitality', value: safeStats.vitality, color: '#FF1744' },
    { label: 'Know.', value: safeStats.knowledge, color: '#00F0FF' },
    { label: 'Wealth', value: safeStats.wealth, color: '#FFD700' },
    { label: 'Create', value: safeStats.creativity, color: '#FF69B4' },
  ];

  const size = 260;
  const center = size / 2;
  const radius = size / 2 - 40; 
  const maxStat = 100;

  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    // Ensure value doesn't exceed 100 visually
    const clampedValue = Math.min(Math.max(value, 0), maxStat);
    const r = (clampedValue / maxStat) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  const bgPoints = data.map((_, i) => getPoint(100, i)).join(' ');
  const grid50Points = data.map((_, i) => getPoint(50, i)).join(' ');
  const grid25Points = data.map((_, i) => getPoint(25, i)).join(' '); // Added 25% grid
  const statPoints = data.map((d, i) => getPoint(d.value, i)).join(' ');

  const getLabelCoords = (index) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = radius + 25;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <Svg height={size} width={size}>
        {/* Background Grids */}
        <Polygon points={bgPoints} stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(0,0,0,0.2)" />
        <Polygon points={grid50Points} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <Polygon points={grid25Points} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
        
        {/* Spokes (Center to Edge) */}
        {data.map((_, i) => {
          const start = getPoint(0, i);
          const end = getPoint(100, i);
          const [x1, y1] = start.split(',');
          const [x2, y2] = end.split(',');
          return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.1)" />;
        })}

        {/* The Filled Stat Polygon */}
        <Polygon
          points={statPoints}
          fill="rgba(138, 43, 226, 0.4)"
          stroke={COLORS.secondary}
          strokeWidth="2"
        />

        {/* Data Points (Dots) */}
        {data.map((d, i) => {
          const point = getPoint(d.value, i);
          const [cx, cy] = point.split(',');
          return <Circle key={i} cx={cx} cy={cy} r="4" fill={d.color} stroke="#FFF" strokeWidth="1" />;
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const { x, y } = getLabelCoords(i);
          return (
            <SvgText
              key={i}
              x={x}
              y={y}
              fill={d.color}
              fontSize="12"
              fontWeight="bold"
              fontFamily={FONTS.bold}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {d.label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.3)',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginBottom: 10,
    alignSelf: 'flex-start'
  }
});