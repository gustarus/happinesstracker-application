'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import {colorsForValues, styles} from '@core/theme';

import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text as SvgText,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

// TODO refactoring needed: optimize code and make it shorter
class Chart extends Component {

  render() {
    const {groups, width, height} = this.props;
    const {paddingTop, paddingRight, paddingBottom, paddingLeft} = componentStyles.canvas;

    const svgWidth = width;
    const svgHeight = height - componentStyles.title.height - componentStyles.content.marginTop;

    const contentWidth = svgWidth - paddingRight - paddingLeft;
    const contentHeight = svgHeight - paddingTop - paddingBottom;

    const stepX = contentWidth / (groups.length - 1);
    const stepY = contentHeight / 4;
    
    let dates = [];
    let dots = [];
    const points = groups.reduce((stack, group, i) => {
      const x = (groups.length === 1 ? contentWidth : i * stepX) + paddingLeft;

      // add dot to the path
      if (group.records.length) {
        const value = group.records.reduce((sum, record) => sum + record.value, 0) / group.records.length;
        const y = contentHeight - (value + 2) * stepY + paddingTop;

        dots.push(
          <Circle
            key={`dot-${x}`}
            cx={x}
            cy={y}
            r='3'
            stroke='#333333'
            strokeWidth='1'
            fill={this.getSliceColor(value)}/>
        );

        stack.push([x, y]);
      }
      
      // add date to the x line
      if (i === 0 || i === groups.length - 1) {
        dates.push(
          <SvgText key={`date-${i}`}
                   x={x} y={svgHeight - componentStyles.date.height} fontSize={componentStyles.date.fontSize}
                   textAnchor='middle'>{moment(group.timestamp).format('MMM D').toUpperCase()}</SvgText>
        );
      }

      return stack;
    }, []);

    const steps = [1, 0, -1, -2].map((value, i) => {
      return (
        <Rect
          key={`step-${i}`}
          x='0'
          y={i * stepY + paddingTop}
          width='5'
          height={stepY}
          fill={this.getSliceColor(value)}/>
      );
    });

    let path;
    if (points.length) {
      const move = `M${points[0]} ${points[1]}`;
      const lines = points.slice(1).map(point => `L${point[0]} ${point[1]}`);
      path = (
        <Path
          d={`${move} ${lines.join(' ')}`}
          fill='none'
          stroke='#333333'
          strokeWidth='2'/>
      );
    }

    let message;
    if(!points.length) {
      message= (
        <SvgText x={contentWidth / 2 + paddingLeft}
                 y={contentHeight / 2 + paddingTop - componentStyles.message.height}
                 fontSize={componentStyles.message.fontSize}
                 fontFamily={componentStyles.message.fontFamily}
                 textAnchor='middle'>
          There is no data yet. Make your first record
        </SvgText>
      )
    }

    return (
      <View style={[componentStyles.chart, this.props.style]}>
        <Text style={componentStyles.title}>{this.props.title}</Text>

        <Svg width={svgWidth} height={svgHeight} style={[styles.content, componentStyles.content]}>
          {steps}
          <Line
            x1='0'
            y1={contentHeight / 2 + paddingTop}
            x2={width}
            y2={contentHeight / 2 + paddingTop}
            stroke='#333333'
            strokeWidth='1'/>
          {path}
          {message}
          {dots}
          {dates}
        </Svg>
      </View>
    );
  }

  getSliceColor(value) {
    switch (true) {
      case value <= 2 && value >= 1:
        return colorsForValues[2].backgroundColor;
      case value < 1 && value >= 0:
        return colorsForValues[1].backgroundColor;
      case value < 0 && value >= -1:
        return colorsForValues[-1].backgroundColor;
      case value < -1 && value >= -2:
        return colorsForValues[-2].backgroundColor;
    }
  }
}

const componentStyles = {
  canvas: {
    paddingTop: 4,
    paddingRight: 24,
    paddingBottom: 23,
    paddingLeft: 24
  },

  title: {
    height: 30,
    fontSize: 20,
    fontFamily: 'Avenir-Light',
    textAlign: 'center'
  },

  content: {
    marginTop: 40
  },

  date: {
    height: 15,
    fontSize: 10,
    backgroundColor: 'blue'
  },

  message: {
    height: 22,
    fontSize: 14,
    fontFamily: 'Avenir-Light'
  }
};

export default Chart;
