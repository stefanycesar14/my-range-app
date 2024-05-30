
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Range {
  min: number;
  max: number;
}

const useFetchRange = (url: string) => {
  const [range, setRange] = useState<Range | null>(null);
  const [fixedValues, setFixedValues] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRange = async () => {
      try {
        const response = await axios.get(url);
        if (response.data.min !== undefined && response.data.max !== undefined) {
          setRange(response.data);
        } else if (response.data.rangeValue) {
          setFixedValues(response.data.rangeValue);
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching range data');
        setLoading(false);
      }
    };

    fetchRange();
  }, [url]);

  return { range, fixedValues, loading, error };
};

export default useFetchRange;
