
import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { AlertProvider, useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, submit } = useSubmit();
  const { onOpen, response } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      type: Yup.string().required("Type is required"),
      comment: Yup.string().min(10, "Too Short!").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const submitResponse = await submit(values);
        if (submitResponse.type === "success") {
          successAlert(`Form submitted successfully! First Name: ${values.firstName}`);
          resetForm();
        } else {
          onOpen("error", submitResponse.message);
        }
      } catch (error) {
        onOpen("error", "An error occurred while submitting the form.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        onOpen("success", response.message);
        formik.resetForm();
      } else if (response.type === "error") {
        onOpen("error", response.message);
      }
    }
  }, [response, onOpen, formik]);

  return (
    <AlertProvider>
      <FullScreenSection
        isDarkBackground
        backgroundColor="#512DA8"
        py={16}
        spacing={8}
      >
        <VStack w="1024px" p={32} alignItems="flex-start">
          <Heading as="h1" id="contactme-section">
            Contact me
          </Heading>
          <Box p={6} rounded="md" w="100%">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4}>
                <FormControl
                  isInvalid={
                    formik.touched.firstName && formik.errors.firstName
                  }
                >
                  <FormLabel htmlFor="firstName">Name</FormLabel>
                  <Input
                    {...formik.getFieldProps("firstName")}
                    id="firstName"
                    name="firstName"
                  />
                  <FormErrorMessage>
                    {formik.errors.firstName}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    {...formik.getFieldProps("email")}
                    id="email"
                    name="email"
                    type="email"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.type && formik.errors.type}
                >
                  <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                  <Select
                    {...formik.getFieldProps("type")}
                    id="type"
                    name="type"
                  >
                    <option value="hireMe">Freelance project proposal</option>
                    <option value="openSource">
                      Open source consultancy session
                    </option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.comment && formik.errors.comment}
                >
                  <FormLabel htmlFor="comment">Your message</FormLabel>
                  <Textarea
                    {...formik.getFieldProps("comment")}
                    id="comment"
                    name="comment"
                    height={250}
                  />
                  <FormErrorMessage>
                    {formik.errors.comment}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  width="full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </FullScreenSection>
    </AlertProvider>
  );
};

export default LandingSection;
