const date = require('date-and-time');

const convertMongoDbTimestampToDate = (mongoTimestamp, format) =>{
    let convertedDate = date.format(new Date(mongoTimestamp), format)
    return convertedDate;
}

export default {convertMongoDbTimestampToDate}