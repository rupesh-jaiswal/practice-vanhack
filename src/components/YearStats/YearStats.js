import React, { Component } from 'react';
import underscore from 'underscore';
import successData from '../../assets/success-cases';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
export class YearStats extends Component {
    state = {
        statsData:undefined
    } 
    componentDidMount() {
        const yearStats = underscore.groupBy(successData, 'Year');
        const years = Object.keys(yearStats);
        const statsData = years.map((year) => ({
            Year: year,
            Hires: yearStats[year].length
        }));
        this.setState({ statsData});
    }
    onBarClick = (data) => {
        console.log(data);
    }
    render() {
        return (
            <div className="year-container">
                {this.state.statsData && 
                    <BarChart width={400} height={500} data={this.state.statsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Hires" fill="#8884d8" onClick={this.onBarClick}/>
                    </BarChart>
                }
            </div>
        )
    }
}
export default YearStats;