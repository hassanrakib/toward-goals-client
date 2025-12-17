import Form from "@/components/derived-ui/form";
import StyledButton from "@/components/derived-ui/styled-button";
import StyledInput from "@/components/derived-ui/styled-input";
import StyledSelect from "@/components/derived-ui/styled-select";
import SubmitButton from "@/components/derived-ui/submit-button";
import { Card, createListCollection, Flex, Grid, GridItem, Steps } from "@chakra-ui/react";

interface IFormValues {
    activity1: {name: string; unit: string};
    activity2: {name: string; unit: string};
    activity3: {name: string; unit: string};
}

interface ActivitiesFormProps {
    onSubmit: (data: IFormValues) => void;
}

const ActivitiesForm = (props: ActivitiesFormProps) => {

    const defaultValues: IFormValues = {
        activity1: {name: "", unit: "times"},
        activity2: {name: "", unit: "times"},
        activity3: {name: "", unit: "times"},
    };

    const onSubmit = async (data: IFormValues) => {
        props.onSubmit(data);
    };

    const units = createListCollection({
        items: [
            { label: "Times", value: "times" },
            { label: "Minutes", value: "minutes" },
        ],
    })

    return (
        <Flex justify="center" align="center">
            <Card.Root maxW="lg" w="100%" borderRadius="2xl" boxShadow="xs" bg="bg">
                <Card.Header>
                    <Card.Title fontSize="2xl">Create Activites</Card.Title>
                    <Card.Description>
                        List down the activities that will help you achieve your goal.
                    </Card.Description>
                </Card.Header>
                <Form
                    onSubmit={onSubmit}
                    useFormProps={{
                        defaultValues,
                    }}
                >
                    <Card.Body>
                        <Grid templateColumns="2fr 1fr" gap={3}>
                            <GridItem>
                                <StyledInput
                                    type="text"
                                    name="activity1.name"
                                    label="Activity 1"
                                    placeholder="Enter the first activity"
                                />
                            </GridItem>
                            <GridItem>
                                <StyledSelect
                                    name="activity1.unit"
                                    placeholder="Select unit"
                                    label="Unit"
                                    collection={units}
                                />
                            </GridItem>
                            <GridItem>
                                <StyledInput
                                    type="text"
                                    name="activity2.name"
                                    label="Activity 2"
                                    placeholder="Enter the second activity"
                                />
                            </GridItem>
                            <GridItem>
                                <StyledSelect
                                    name="activity2.unit"
                                    placeholder="Select unit"
                                    label="Unit"
                                    collection={units}
                                />
                            </GridItem>
                            <GridItem>
                                <StyledInput
                                    type="text"
                                    name="activity3.name"
                                    label="Activity 3"
                                    placeholder="Enter the third activity"
                                />
                            </GridItem>
                            <GridItem>
                                <StyledSelect
                                    name="activity3.unit"
                                    placeholder="Select unit"
                                    label="Unit"
                                    collection={units}
                                />
                            </GridItem>
                        </Grid>
                    </Card.Body>
                    <Card.Footer flexDir="row" alignItems="center" justifyContent="stretch">
                        <Steps.PrevTrigger asChild>
                            <StyledButton width="1/2">Previous</StyledButton>
                        </Steps.PrevTrigger>
                        {/* submit button */}
                        <SubmitButton
                            width="1/2"
                            isServerActionLoading={false}
                        >
                            Next
                        </SubmitButton>
                    </Card.Footer>
                </Form>
            </Card.Root>
        </Flex>
    );
}

export default ActivitiesForm;