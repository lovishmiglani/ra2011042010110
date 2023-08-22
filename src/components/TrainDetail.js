import React, { useEffect, useState } from 'react';
import { getTrainDetails } from '../api';

function TrainDetail({ match }) {
    const [train, setTrain] = useState(null);
    const trainNumber = match.params.trainNumber; // 

    useEffect(() => {
        // Fetch train details
        const fetchData = async () => {
            const trainData = await getTrainDetails(trainNumber);
            setTrain(trainData);
        };

        fetchData();
    }, [trainNumber]);

    
}

export default TrainDetail;
