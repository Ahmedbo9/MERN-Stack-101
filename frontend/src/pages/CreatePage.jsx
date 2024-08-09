import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const toast = useToast();

  const onSubmit = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"} size={"2xl"} textAlign={"center"} mb={8}>
      <VStack spacing={8}>
        <Heading as={"h1"}>Create a Wish</Heading>
        <Box
          p={6}
          rounded={"lg"}
          shadow={"md"}
          w={"full"}
          bg={useColorModeValue("white", "grey.800")}
        >
          <VStack spacing={4}>
            <Input
              name="name"
              value={newProduct.name}
              placeholder="Product Name"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              name="price"
              value={newProduct.price}
              placeholder="Product price"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              name="image"
              value={newProduct.image}
              placeholder="Product Image"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button onClick={onSubmit}>Create</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
