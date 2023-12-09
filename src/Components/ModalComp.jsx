import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [npm, setNPM] = useState(dataEdit.npm || ""); 
    const [gender, setGender] = useState(dataEdit.gender || ""); 

    const handleSave = () => {
        if (!name || !email || !npm || !gender) return;

        if (emailAlreadyExists()) {
            return alert("Email already exists");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email, npm, gender };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email, npm, gender }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }
        return false;
    };

    return (
        <>
            <h1>Hello</h1>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Input Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display='flex' flexDirection='column' gap={4}>
                            <Box>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type='text'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>NPM</FormLabel>
                                <Input
                                    type='text'
                                    value={npm}
                                    onChange={(e) => setNPM(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Gender</FormLabel>
                                <Input
                                    type='text'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>


                    <ModalFooter justifyContent='start'>
                        <Button colorScheme='green' mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>

    )
}

export default ModalComp
