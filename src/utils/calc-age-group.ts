export function calcAgeGroup(date: string, listTicketAgeGroup: any, gender: string, eventDate: any) {
    let age = 0;
    let ageGroup: any;
    if (date && gender && eventDate) {
        const words: any = date.split('-');
        const year = new Date(eventDate).getFullYear();
        age = year - words[0];
        ageGroup = listTicketAgeGroup?.find((x: any) => (
            x.gender !== 'ALL' ?
                (age >= x.minAgeRange && age <= x.maxAgeRange) && gender === x.gender : (age >= x.minAgeRange && age <= x.maxAgeRange)
        ));
    }
    return ageGroup;
}