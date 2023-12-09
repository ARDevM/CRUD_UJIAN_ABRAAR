import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_customer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_customer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      flexDirection="column"
      fontSize="20px"
      fontFamily="poppins"
      bgImage="url('/src/assets/background.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Heading mb={6} color="black">
        Awesome Data Management
      </Heading>

      <Box
        maxW={800}
        w="100%"
        p={4}
        bg="rgba(255, 255, 255, 0.7)"
        rounded="md"
        shadow="md"
      >
        <Button
          colorScheme="blue"
          size="md"
          mb={4}
          onClick={() => [setDataEdit({}), onOpen()]}
        >
          Add New Data
        </Button>

        <Box overflowY="auto" height="100%">
          <Table variant="simple" mt="6" size="sm">
            <Thead bg="blue.500" color="white">
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>NPM</Th>
                <Th>Gender</Th>
                <Th>Action</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email, npm, gender }, index) => (
                <Tr key={index} _hover={{ bg: "gray.200" }}>
                  <Td>{name}</Td>
                  <Td>{email}</Td>
                  <Td>{npm}</Td>
                  <Td>{gender}</Td>
                  <Td>
                    <EditIcon
                      cursor="pointer"
                      color="blue.500"
                      onClick={() => [setDataEdit({ name, email, index }), onOpen()]}
                    />
                  </Td>
                  <Td>
                    <DeleteIcon
                      cursor="pointer"
                      color="red.500"
                      onClick={() => handleRemove(email)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
