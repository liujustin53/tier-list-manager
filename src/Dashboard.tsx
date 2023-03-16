import { Box, Button, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { isLoggedIn } from "./helpers";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      // if not found, redirect to the login page
      window.location.href = '/';
    }
  }, []);

  const getList = async (type: string) => {
    try {
      setData([]);
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:8000/api/list?type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
      setData(data.list);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box m={5}>
      <Button onClick={() => getList('anime')}>
        Get Anime List
      </Button>
      <Button onClick={() => getList('manga')}>
        Get Manga List
      </Button>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {data &&
        <UnorderedList spacing={3}>
          {data.map((entry: any) => (
            <Box>
              <ListItem><Image src={entry.main_picture} alt={entry.animanga_id} /></ListItem>
              <Text>{entry.score}</Text>
            </Box>
          ))}
        </UnorderedList>
      }
    </Box>
  )
}