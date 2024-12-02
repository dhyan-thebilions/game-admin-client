import React, { useState } from "react";
import {
    CreateBase,
    NumberInput,
    SimpleForm,
    TextInput,
    required,
    regex,
    useRedirect,
} from "react-admin";
import {
    Form,
    Input,
    FormGroup,
    Label,
    Button,
    Row,
    Col,
    Card,
    CardBody,
} from "reactstrap";
import { Parse } from "parse";
import { parseConfig } from "../../parseConfig";

// Initialize Parse
Parse.initialize(parseConfig.APP_ID, parseConfig.MASTER_KEY);
Parse.serverURL = parseConfig.URL;

export const CreateUser = () => {
    const redirect = useRedirect();

    const onSuccess = () => {
        redirect("list", "users");
    };

    // State for form fields (initially empty)
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
        return emailRegex.test(value);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsInvalid(!validateEmail(value)); // Set invalid state if email is not valid
    };

    // Function to create a new user in Parse
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Parse.Cloud.run("createUser", {
                username: userName,
                name,
                email,
                password,
                balance: parseFloat(balance),
            });
            redirect("list", "users");
        } catch (error) {
            console.error("Error creating game details:", error);
        }
    };

    return (
        // <CreateBase mutationOptions={{ onSuccess }}>
        //     <Card
        //         sx={{
        //             mt: 2,
        //         }}
        //     >
        //         <SimpleForm onSubmit={handleSubmit}>
        //             <TextInput source="username" label="User Name" validate={[required()]} />
        //             <TextInput source="name" label="Name" validate={[required()]} />
        //             <TextInput source="email" label="Email" validate={emailValidation} />
        //             <NumberInput source="balance" label="Balance" validate={[required()]} />
        //             <TextInput source="password" label="Password" validate={[required()]} />
        //             <TextInput source="confrimPassword" label="Confrim Password" validate={[required()]} />
        //         </SimpleForm>
        //     </Card>
        // </CreateBase>
        <React.Fragment>
            <Card className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="userName">User Name</Label>
                                    <Input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        autoComplete="off"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label for="balance">Balance</Label>
                                    <Input
                                        id="balance"
                                        name="balance"
                                        type="number"
                                        autoComplete="off"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Label for="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="off"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <Button type="submit" color="success" className="mt-2">
                                    Create User
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Form>
            </Card>
        </React.Fragment>
    );
};
