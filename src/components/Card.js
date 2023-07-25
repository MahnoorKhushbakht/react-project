import { Box, Image, Stack, Heading, Text, Button ,HStack} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box borderRadius="8px" p={1} maxWidth="sm" width="100%" backgroundColor="white">
      <Image src={imageSrc} alt={title} borderRadius="lg " objectFit="cover" />
      <Stack mt={6} spacing={3}>
        <Heading p={2}color='black' size="md">{title}</Heading>
        <Text p={2} color='#6c6c6c'>{description}</Text>
      </Stack>
      <HStack spacing={6}>
      <Text p={2}color='black'>See More
      <FontAwesomeIcon icon={faArrowRight} size="1x"/>
      </Text>
      
      
      </HStack>
      
    </Box>
  );
};

export default Card;
