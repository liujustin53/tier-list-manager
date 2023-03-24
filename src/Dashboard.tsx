import { Box, Button, Container, Flex, Image, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { isLoggedIn, ListEntry } from "./helpers";
import { TierList } from "./TierList";

export const Dashboard = () => {
  const [data, setData] = useState([] as ListEntry[]);
  const [tiers, setTiers] = useState([]);
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

      let list: ListEntry[] = [];
      for (let entry of data.list) {
        list.push({
          animanga_id: entry.animanga_id,
          score: entry.score,
          main_picture: entry.main_picture,
          tier: tiers[entry.score - 1],
        });
      }
      setData(list);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const getTiers = async () => {
    try {
      setTiers([]);
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:8000/api/tiers`, {
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

      setTiers(data.tiers);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTiers();
  }, []);

  return (
    <Stack m={5}>
      <Stack direction={'row'}>
        <Button onClick={() => getList('anime')}>
          Get Anime List
        </Button>
        <Button onClick={() => getList('manga')}>
          Get Manga List
        </Button>
      </Stack>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {data &&
        <TierList tiers={tiers} list={data} />
      }
    </Stack>
  )
}