import React, { useState } from "react";
import EditSearch from "../components/EditSearch";
import ButtonSearchingDay from "../components/ButtonSearchingDay";

const Test = () => {
    const [selectedDate, setSelectedDate] = useState("02/03/2023"); // State for selected day

    const handleClick = (date) => {
        setSelectedDate(date);
    };
    const days = [
        { day: 'Selasa', date: '01/03/2023' },
        { day: 'Rabu', date: '02/03/2023' },
        { day: 'Kamis', date: '03/03/2023' },
        { day: 'Jumat', date: '04/03/2023' },
        { day: 'Sabtu', date: '05/03/2023' },
        { day: 'Minggu', date: '06/03/2023' },
        { day: 'Senin', date: '07/03/2023' },
        { day: 'Selasa', date: '08/03/2023' },
    ];


    return (
        <>
            <EditSearch
                origin="JKT"
                destination="MLB"
                passengers={2}
                classType="Economy"
                onEdit={() => console.log("Edit search clicked")}
            />
            <div className="flex p-4">
                {days.map(({ day, date }) => (
                    <ButtonSearchingDay
                        key={day}
                        day={day}
                        date={date}
                        onClick={() => handleClick(date)}
                        isSelected={selectedDate === date}
                    />
                ))}
            </div>
        </>
    );
}

export default Test;
