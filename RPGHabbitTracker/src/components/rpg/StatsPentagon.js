import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import { FONTS, COLORS } from '../../constants/theme';

export default function StatsPentagon({ stats }) {
  // Stat sıralaması ve etiketler
  const data = [
    { label: 'Mind', value: stats.mind, color: '#8A2BE2' },       // Üst
    { label: 'Vitality', value: stats.vitality, color: '#FF1744' }, // Sağ Üst
    { label: 'Know.', value: stats.knowledge, color: '#00F0FF' },   // Sağ Alt
    { label: 'Wealth', value: stats.wealth, color: '#FFD700' },     // Sol Alt
    { label: 'Create', value: stats.creativity, color: '#FF69B4' }, // Sol Üst
  ];

  const size = 260; // Grafik boyutu
  const center = size / 2;
  const radius = size / 2 - 40; // Yazılar için kenardan boşluk bırak
  const maxStat = 100; // Statlar maksimum 100 üzerinden hesaplanır

  // Açıyı hesapla (5 köşe olduğu için 360/5 = 72 derece)
  // -90 derece diyerek çizimi tepeden başlatıyoruz (Saat 12 yönü)
  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = (value / maxStat) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  };

  // 1. Dış Çerçeve (Maksimum değerler)
  const bgPoints = data.map((_, i) => getPoint(100, i)).join(' ');
  
  // 2. İç Çerçeveler (Izgara görünümü için %50 ve %25 çizgileri)
  const grid50Points = data.map((_, i) => getPoint(50, i)).join(' ');

  // 3. Oyuncu Statları (Dolu alan)
  const statPoints = data.map((d, i) => getPoint(d.value, i)).join(' ');

  // Etiket Pozisyonları (Biraz daha dışarıda dursunlar diye radius + 25)
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
        {/* Arka Plan Izgaraları */}
        <Polygon points={bgPoints} stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(0,0,0,0.2)" />
        <Polygon points={grid50Points} stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        
        {/* Merkezden Köşelere Giden Çizgiler */}
        {data.map((_, i) => {
          const start = getPoint(0, i); // Merkez
          const end = getPoint(100, i); // En uç
          const [x1, y1] = start.split(',');
          const [x2, y2] = end.split(',');
          return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.1)" />;
        })}

        {/* Oyuncunun Stat Alanı (Dolu Kısım) */}
        <Polygon
          points={statPoints}
          fill="rgba(138, 43, 226, 0.4)" // Mor şeffaf dolgu
          stroke={COLORS.secondary}     // Neon mavi kenarlık
          strokeWidth="2"
        />

        {/* Köşe Noktaları (Küçük Yuvarlaklar) */}
        {data.map((d, i) => {
          const point = getPoint(d.value, i);
          const [cx, cy] = point.split(',');
          return <Circle key={i} cx={cx} cy={cy} r="4" fill={d.color} stroke="#FFF" strokeWidth="1" />;
        })}

        {/* Etiketler (Mind, Vitality vb.) */}
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
              textAnchor="middle" // Metni ortala
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