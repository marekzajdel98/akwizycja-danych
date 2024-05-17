import React, { useEffect, useState } from "react";
import { ref, onValue, getDatabase } from "firebase/database";
import app from "../firebase";

export default function RealTimeTracking() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const database = getDatabase(app);

    const dataRef = ref(database, "test");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setData(dataArray);
      } else {
        setData([]);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
