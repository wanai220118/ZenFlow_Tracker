import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 80;
const CHART_HEIGHT = 200;

const WeightChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="show-chart" size={48} color="#E2DBD0" />
        <Text style={styles.emptyText}>No weight data available</Text>
        <Text style={styles.emptySubtext}>Start logging your daily weight to see progress</Text>
      </View>
    );
  }

  // Sort data by date
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Get min and max weights for scaling
  const weights = sortedData.map((d) => d.weight).filter((w) => w != null);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const weightRange = maxWeight - minWeight || 1;
  const padding = weightRange * 0.1; // 10% padding

  // Calculate points for the line
  const points = sortedData.map((entry, index) => {
    const x = (index / (sortedData.length - 1 || 1)) * CHART_WIDTH;
    const normalizedWeight = entry.weight - minWeight + padding;
    const normalizedRange = weightRange + padding * 2;
    const y = CHART_HEIGHT - (normalizedWeight / normalizedRange) * CHART_HEIGHT;
    return { x, y, weight: entry.weight, date: entry.date };
  });

  // Generate Y-axis labels
  const yAxisSteps = 5;
  const yAxisLabels = [];
  for (let i = 0; i <= yAxisSteps; i++) {
    const weight = maxWeight + padding - (i / yAxisSteps) * (weightRange + padding * 2);
    yAxisLabels.push(weight.toFixed(1));
  }

  // Generate X-axis labels (show first, middle, last dates)
  const xAxisLabels = [];
  if (sortedData.length > 0) {
    if (sortedData.length === 1) {
      xAxisLabels.push(new Date(sortedData[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    } else {
      xAxisLabels.push(new Date(sortedData[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      if (sortedData.length > 2) {
        const midIndex = Math.floor(sortedData.length / 2);
        xAxisLabels.push(new Date(sortedData[midIndex].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
      xAxisLabels.push(new Date(sortedData[sortedData.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Progress</Text>
      <View style={styles.chartContainer}>
        <View style={styles.yAxis}>
          {yAxisLabels.map((label, index) => (
            <Text key={index} style={styles.yAxisLabel}>
              {label} kg
            </Text>
          ))}
        </View>
        <View style={styles.chart}>
          <View style={styles.chartArea}>
            {/* Grid lines */}
            {yAxisLabels.map((_, index) => {
              const y = (index / (yAxisLabels.length - 1)) * CHART_HEIGHT;
              return (
                <View
                  key={index}
                  style={[styles.gridLine, { top: y }]}
                />
              );
            })}

            {/* Data points and line */}
            {points.length > 0 && (
              <>
                {/* Simple line using View components */}
                {points.map((point, index) => {
                  if (index === 0) return null;
                  const prevPoint = points[index - 1];
                  const dx = point.x - prevPoint.x;
                  const dy = point.y - prevPoint.y;
                  const length = Math.sqrt(dx * dx + dy * dy);
                  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                  
                  return (
                    <View
                      key={`line-${index}`}
                      style={[
                        styles.lineSegment,
                        {
                          left: prevPoint.x,
                          top: prevPoint.y,
                          width: length,
                          transform: [{ rotate: `${angle}deg` }],
                        },
                      ]}
                    />
                  );
                })}
                
                {/* Data points */}
                {points.map((point, index) => (
                  <View
                    key={`point-${index}`}
                    style={[
                      styles.dataPoint,
                      {
                        left: point.x - 6,
                        top: point.y - 6,
                      },
                    ]}
                  >
                    <View style={styles.dataPointInner} />
                  </View>
                ))}
              </>
            )}
          </View>
          <View style={styles.xAxis}>
            {xAxisLabels.map((label, index) => (
              <Text key={index} style={styles.xAxisLabel}>
                {label}
              </Text>
            ))}
          </View>
        </View>
      </View>
      
      {sortedData.length > 0 && (
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Start</Text>
            <Text style={styles.statValue}>{sortedData[0].weight} kg</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Current</Text>
            <Text style={styles.statValue}>{sortedData[sortedData.length - 1].weight} kg</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Change</Text>
            <Text style={[
              styles.statValue,
              sortedData[sortedData.length - 1].weight - sortedData[0].weight >= 0
                ? styles.statValuePositive
                : styles.statValueNegative,
            ]}>
              {sortedData[sortedData.length - 1].weight - sortedData[0].weight >= 0 ? '+' : ''}
              {(sortedData[sortedData.length - 1].weight - sortedData[0].weight).toFixed(1)} kg
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#103713',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#628B35',
    fontWeight: '600',
  },
  chart: {
    flex: 1,
  },
  chartArea: {
    height: CHART_HEIGHT,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#FFFDF5',
    opacity: 0.3,
  },
  lineSegment: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#628B35',
    transformOrigin: 'left center',
  },
  dataPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#103713',
    borderWidth: 2,
    borderColor: '#FFFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataPointInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#628B35',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  xAxisLabel: {
    fontSize: 10,
    color: '#628B35',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#628B35',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#628B35',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#103713',
  },
  statValuePositive: {
    color: '#628B35',
  },
  statValueNegative: {
    color: '#103713',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#E2DBD0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#628B35',
  },
  emptyText: {
    fontSize: 16,
    color: '#628B35',
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#628B35',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default WeightChart;
