import React, { Component } from 'react';
import underscore from 'underscore';
import successData from '../../assets/success-cases';
import { getRandomColor } from '../../utils/color-generator';
import { PieChart, Pie, Cell} from 'recharts';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Sector} from 'recharts';
const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Total ${value})`}
        </text>
      </g>
    );
  };
export class AreaStats extends Component {
    state = {
        statsData:undefined,
        activeIndex: 0
    } 
    
    componentDidMount() {
        const areasData = underscore.groupBy(successData, 'Area');
        const areas = Object.keys(areasData);
        const statsData = areas.map((area) => ({
            name: area || "Others",
            Hires: areasData[area].length
        }));
        this.setState({ statsData});
    }
    onPieEnter=(data, index) => {
        this.setState({
        activeIndex: index,
        });
    }
    onPieClick = (data) => {
        console.log(data);
    }
    getLabel(data) {
        console.log(data.name);
        return data.name;
    }
    render() {
        return (
            <div className="area-container">
                {this.state.statsData && 
                    <PieChart width={700} height={450}>
                    <Pie data={this.state.statsData} cx="350" cy="200" dataKey="Hires" outerRadius={150} innerRadius={100}
                    onMouseEnter={this.onPieEnter} 
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape} 
                    >
                      {
                        this.state.statsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRandomColor()}/>
                        ))
                      }
                    </Pie>
                    <Tooltip/>
                  </PieChart>
                }
                <h3>Hires by Areas</h3>
                
            </div>
        )
    }
}

export default AreaStats;