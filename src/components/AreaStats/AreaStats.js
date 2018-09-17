import React, { Component } from 'react';
import underscore from 'underscore';
import successData from '../../assets/success-cases';
import { getRandomColor } from '../../utils/color-generator';
import { PieChart, Pie, Cell} from 'recharts';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
export class AreaStats extends Component {
    state = {
        statsData:undefined
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
    onPieClick = (data) => {
        console.log(data);
    }
    getLabel(data) {
        console.log(data.name);
        return data.name;
    }
    render() {
        return (
            <div className="skills-container">
                <BarChart width={1300} height={500} data={this.state.statsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Hires" fill="#8884d8" />
                </BarChart>
                {this.state.statsData && 
                    <PieChart width={800} height={800}>
                    <Pie data={this.state.statsData} cx="400" cy="400" dataKey="Hires" outerRadius={400} label={this.getLabel}>
                      {
                        this.state.statsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRandomColor()}/>
                        ))
                      }
                    </Pie>
                  </PieChart>
                }
                
            </div>
        )
    }
}

export default AreaStats;