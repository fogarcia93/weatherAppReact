import moment from 'moment';
import 'moment/locale/es';
import transformWeather from './transformWeather';

const transformForecast = data => (
    data.list.filter(item => (
        moment.unix(item.dt).hour() === 3 ||
        moment.unix(item.dt).hour() === 6 ||
        moment.unix(item.dt).hour() === 9
    )).map(item => (
        {
           weekDay: moment.unix(item.dt).format('ddd'),
           hour: moment.unix(item.dt).hour(),
           data: transformWeather(item)
        }
    ))
);

export default transformForecast;