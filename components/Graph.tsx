import { Node } from '../types/Node'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

interface GraphDetails {
    title: string;
    data_type: string;
}

export interface GraphProps {
    node: Node,
    data: [Date, number][],
    details: GraphDetails
}


const Graph = (props: GraphProps) => {
    const chartOptions = {
        title: {
            text: props.node.nodeName,
        },
        chart: {
            zoomType: 'x'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: props.details.title
            },
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            name: props.details.data_type,
            data: props.data
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    )
}

export default Graph;