export default (date) => {
    const d = new (date);
    const dtf = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month : "short",
        day : "2-digits",
    });

    const [{value: formatedMonth}, , {value: formatedDate}, , {value: formatedYear}] = dtf.formatToParts(d);
    return `${formatedDate} ${formatedMonth}, ${formatedYear}`;
}