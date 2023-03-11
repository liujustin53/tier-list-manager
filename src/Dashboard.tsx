import { Box, Button, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

export const Dashboard = () => {
  // save the session id from the url as a cookie
  const [sessionID, setSessionID] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // try getting the session id from the url
    const urlParams = new URLSearchParams(window.location.search);
    let session_id = urlParams.get('session_id');
    if (session_id) {
      // save the session id as a cookie
      document.cookie = `session_id=${session_id}`;
    } else {
      // if not found, try getting it from the cookie
      const session_cookie = document.cookie.split('; ').find(row => row.startsWith('session_id=')) || '';
      session_id = session_cookie.split('=')[1];
      if (!session_id) {
        return;
      }
    }
    setSessionID(session_id);

  }, []);

  const getList = async (type: string) => {
    try {
      setLoading(true);

      if (!sessionID) {
        throw new Error('No session id found, please reauthenticate.');
      }

      const reqOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      const response = await fetch(`http://localhost:8000/api/list?type=${type}&session_id=${sessionID}`, reqOptions);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
      setData(data);
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
      <Text>Session ID: {sessionID}</Text>
      <Text>Session cookie: {document.cookie}</Text>
      <Button onClick={() => getList('anime')}>
        Get Anime List
      </Button>
      <Button onClick={() => getList('manga')}>
        Get Manga List
      </Button>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {data && data.map((anime: any) => (
        <Text key={anime.id}>{anime.title}</Text>
      ))}
    </Box>
  )
}