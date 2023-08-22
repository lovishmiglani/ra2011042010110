import React, { useEffect, useState } from 'react';
import { getAllTrains } from '../api';

function TrainList() {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
            const allTrains = await getAllTrains();
            setTrains(allTrains);
        };

        fetchData();
    }, []);


}

export default TrainList;
