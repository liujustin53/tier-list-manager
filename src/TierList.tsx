import { Center, Flex, Image, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { ListEntry } from "./helpers";

interface TierListProps {
  tiers: string[]
  list: ListEntry[];
}

export const TierList = ({ tiers, list }: TierListProps) => {
  return (
    <Flex
      direction={'column-reverse'}
      bgColor='#333'
      border='1px'
      borderColor="black"
    >
      {tiers.map((tier) => (
        <Stack direction={'row'} spacing='0px' border='1px' borderColor='black'>
          <Center bg='tomato' minW={100} minH={100} borderRight='2px' borderColor='black'>
            {tier}
          </Center>
          <Wrap spacing={0}>
            {list.filter((entry) => entry.tier === tier).map((entry) => (
              <WrapItem>
                <Image src={entry.main_picture} width={100} height={145}/>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      ))}
    </Flex>
  )
}