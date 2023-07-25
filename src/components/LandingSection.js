import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
        <VStack spacing={4} alignItems="center">
      <Avatar size="xl" name="Pete" src="https://i.pravatar.cc/150?img=7 " />
      <Heading size="sm" color="white" textAlign="center">
        {greeting}
      </Heading>
      <Heading size="lg" color="white" textAlign="center">
        {bio1}
      </Heading>
      <Heading size="lg" color="white" textAlign="center">
        {bio2}
      </Heading>
    </VStack>

  </FullScreenSection>
);

export default LandingSection;
