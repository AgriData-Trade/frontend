import { Sensor } from '../types/Sensor'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { getOptions, color } from 'highcharts'
import useSWR from 'swr'


interface Props {
    sensor: Sensor;
    location: [number, number]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SensorTooltip = (props: Props) => {
    const { sensor, location } = props;
    //http://localhost:3000/api/data/${sensor.id}
    const { data, error } = useSWR("https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json", fetcher)

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

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