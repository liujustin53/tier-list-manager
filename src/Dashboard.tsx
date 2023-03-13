import { Box, Button, Center, Flex, Image, ListItem, Text, UnorderedList } from "@chakra-ui/react"
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
        // if not found, redirect to the login page
        window.location.href = '/';
      }
    }
    setSessionID(session_id);
  }, []);

  const getList = async (type: string) => {
    try {
      setData([]);
      setLoading(true);
      setError('');

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