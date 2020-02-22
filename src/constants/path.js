export const getRootPath = (data) => {
    const teacherName = data.teacherName;

    return `${teacherName}/`;
}

export const getDatePath = (data) => {
    const teacherName = data.teacherName;
    const eventDate = data.eventDate;

    return `${teacherName}/${eventDate}`;
}

export const getEventPath = (data) => {
    const teacherName = data.teacherName;
    const eventDate = data.eventDate;
    const eventName = data.eventName;

    return `${teacherName}/${eventDate}/${eventName}`;
}
