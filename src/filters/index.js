const locale = 'es-MX';
const dateOptions = { timeZone: 'America/Mexico_City' };

export default {
    timeFilter: function(date) {
        if (!date) {
            return '';
        }
        const date_ = new Date(date);
        return isNaN(date_) ? 
            '' : date_.toLocaleTimeString(locale, dateOptions);
    },
    dateFilter: function(date) {
        if (!date) {
            return '';
        }
        const date_ = new Date(date);
        return isNaN(date_) ? 
            '' : date_.toLocaleDateString(locale, dateOptions);
    },
    dateTimeFilter: function(date) {
        if (!date) {
            return '';
        }
        const date_ = new Date(date);
        return isNaN(date_) ? 
            '' : date_.toLocaleString(locale, dateOptions);
    },
    yearFilter(date) {
        if (!date) {
            return '';
        }
        const date_ = new Date(date);
        return isNaN(date_) ? '' : date_.getFullYear();
    },
    monthFilter(date) {
        if (!date) {
            return '';
        }
        const date_ = new Date(date);
        return isNaN(date_) ? '' : date_.toLocaleString(
            locale, 
            { month: 'long' }
        );
    },
    bigNumberFilter: function(num, digits = 2, prefix = '', sufix = '') {
        var si = [
            { value: 1, symbol: '' },
            { value: 1E3, symbol: 'K' },
            { value: 1E6, symbol: 'M' },
            { value: 1E9, symbol: 'G' },
            { value: 1E12, symbol: 'T' },
            { value: 1E15, symbol: 'P' },
            { value: 1E18, symbol: 'E' }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
        const repr = (num / si[i].value).toFixed(digits).replace(rx, '$1');
        return prefix + repr + si[i].symbol + sufix;
    },
    percentFilter: function(value) {
        return (100 * value).toFixed(0) + '%';
    },
    timeDurationFilter: function(seconds) {
        return new Date(1000 * seconds).toISOString().substr(11, 8);
    },
    timeElapsedFilter: function(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        var dt = Math.floor(seconds / 31536000);

        if (dt >= 1) {
            return dt + ' ' + (dt === 1 ? 'año' : 'años');
        }
        dt = Math.floor(seconds / 2592000);
        if (dt > 1) {
            return dt + ' ' + (dt === 1 ? 'mes' : 'meses');
        }
        dt = Math.floor(seconds / 86400);
        if (dt > 1) {
            return dt + ' ' + (dt === 1 ? 'día' : 'días');
        }
        dt = Math.floor(seconds / 3600);
        if (dt > 1) {
            return dt + ' ' + (dt === 1 ? 'hora' : 'horas');
        }
        dt = Math.floor(seconds / 60);
        if (dt > 1) {
            return dt + ' ' + (dt === 1 ? 'minuto' : 'minutos');
        }
        dt = Math.floor(seconds);
        return dt + ' ' + (dt === 1 ? 'segundo' : 'segundos');
    },
    isoDateFilter: function(date) {
        return new Date(date).toISOString().substring(0, 10);
    }
};
