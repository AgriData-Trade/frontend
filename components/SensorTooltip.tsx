import { Sensor } from '../types/Sensor'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getOptions, color } from 'highcharts'


interface Props {
    sensor: Sensor;
    location: [number, number]
}

const SensorTooltip = (props: Props) => {
    const { sensor, location } = props;

    const getData = async (sensor: Sensor) => {
        // const resonse = await fetch(`http://localhost:3000/api/data/${sensor.id}`);
        const response = await fetch("https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json");
        const data = await response.json();
        console.log(data)
        return data;
    }

    const data = getData(sensor);

    const chartOptions = {
        title: {
            text: sensor.name,
        },
        chart: {
            zoomType: 'x'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Nitrate Levels (ppm)'
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
            name: 'ppm',
            data: data
        }]
    };

    return (
        <div className='sensorTooltip'>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}

export default SensorTooltip;